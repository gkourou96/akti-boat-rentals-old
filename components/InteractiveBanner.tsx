"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";
import { useTexture, useFBO, shaderMaterial } from "@react-three/drei";

// Global store for raw, normalized touch/mouse coordinates
// We use this to bypass the occasionally unreliable state.pointer on mobile
const globalPointer = { x: 0.5, y: 0.5 };

// --- 1. SIMULATION SHADER (The "Physics Engine") ---
const SimulationMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uPrevMouse: new THREE.Vector2(0, 0),
    uVelocity: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(0, 0),
    uTime: 0,
  },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment - KELVIN WAKE PATTERN
  `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform vec2 uVelocity;
    uniform vec2 uResolution;
    uniform float uTime;
    varying vec2 vUv;

    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      
      vec4 past = texture2D(uTexture, uv) * 0.96;

      vec2 mouseUV = uMouse;
      float speed = length(uVelocity) * 100.0;
      
      if (speed < 0.005) {
        gl_FragColor = past;
        return;
      }

      vec2 dir = normalize(uVelocity);
      vec2 toPixel = (uv - mouseUV) * aspect;
      
      float distAlongPath = dot(toPixel, -dir);
      
      vec2 perpDir = vec2(-dir.y, dir.x);
      float distPerpendicular = abs(dot(toPixel, perpDir));
      
      float kelvinAngle = 0.34;
      
      float baseSpread = distAlongPath * tan(kelvinAngle);
      
      float wave1 = sin(distAlongPath * 8.0 + uTime * 1.5) * 0.025;
      float wave2 = sin(distAlongPath * 15.0 - uTime * 2.0) * 0.015;
      float wave3 = sin(distAlongPath * 25.0 + uTime * 3.0) * 0.008;
      
      float curlAmount = wave1 + wave2 + wave3;
      float expectedSpread = baseSpread + curlAmount;
      
      float distFromVLine = abs(distPerpendicular - expectedSpread);
      
      float noise1 = rand(uv * 30.0 + uTime * 0.8) * 0.5;
      float noise2 = rand(uv * 12.0 - uTime * 0.3) * 0.8;
      float noise3 = sin(distAlongPath * 15.0 + uTime * 2.0) * 0.3;
      
      float edgeNoise = (noise1 * 0.4 + noise2 * 0.4 + noise3 * 0.2) * 0.015;
      
      float turbulentDist = distFromVLine + edgeNoise;
      
      float edgeSharpness = 0.008 * (1.0 + speed * 2.0);
      float vWake = smoothstep(edgeSharpness, 0.0, turbulentDist);
      
      vWake *= smoothstep(-0.02, 0.0, distAlongPath);
      vWake *= smoothstep(0.3, 0.0, distAlongPath);
      
      float breakingWaves = rand(vec2(distAlongPath * 8.0, distPerpendicular * 5.0)) * rand(vec2(uTime * 0.5, distAlongPath * 3.0));
      breakingWaves = smoothstep(0.7, 0.9, breakingWaves) * 0.3;
      vWake += breakingWaves * smoothstep(0.15, 0.0, distAlongPath);
      
      float centerTurbulence = 0.0;
      if (distAlongPath > 0.0 && distPerpendicular < expectedSpread) {
        centerTurbulence = smoothstep(expectedSpread, 0.0, distPerpendicular) * 0.4;
        centerTurbulence *= smoothstep(0.15, 0.0, distAlongPath);
      }
      
      vec4 currentWake = vec4(
        vWake * (0.8 + speed * 0.2),
        centerTurbulence,
        0.0, 
        1.0
      );
      
      gl_FragColor = max(past, currentWake);
    }
  `,
);

// --- 2. DISPLAY SHADER (The "Visuals") ---
const DisplayMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMask: new THREE.Texture(),
  },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment - REALISTIC WAKE RENDERING
  `
    uniform sampler2D uTexture;
    uniform sampler2D uMask;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      vec4 wakeSim = texture2D(uMask, uv);
      float edgeFoam = wakeSim.r;
      float centerDark = wakeSim.g;
      
      vec2 displacement = vec2(edgeFoam * 0.02);
      vec2 distortedUV = uv - displacement;
      vec4 imageColor = texture2D(uTexture, distortedUV);
      
      vec4 foamColor = vec4(0.9, 0.95, 1.0, 1.0);
      vec4 darkWater = imageColor * vec4(0.7, 0.75, 0.8, 1.0);
      
      float foamMask = smoothstep(0.3, 0.7, edgeFoam);
      vec4 withFoam = mix(imageColor, foamColor, foamMask * 0.9);
      
      gl_FragColor = mix(withFoam, darkWater, centerDark);
    }
  `,
);

extend({ SimulationMaterial, DisplayMaterial });

// --- 3. THE FLUID LOGIC CORE ---
const FluidSystem = () => {
  const { viewport, gl, size } = useThree();
  const texture = useTexture("/images/akti.jpg");

  const simTargetA = useFBO(size.width / 4, size.height / 4, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  const simTargetB = useFBO(size.width / 4, size.height / 4, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  const simMaterialRef = useRef<any>(null);
  const displayMaterialRef = useRef<any>(null);

  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));

  const frameRef = useRef(0);

  const position = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const velocity = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    // 1. SYNC PHYSICS: Force target to use our globally mapped coordinates
    target.current.set(globalPointer.x, globalPointer.y);

    const oldPos = position.current.clone();
    position.current.lerp(target.current, 0.1);

    velocity.current.subVectors(position.current, oldPos);

    if (!simMaterialRef.current || !displayMaterialRef.current) return;

    const speed = velocity.current.length();
    let sternPos = position.current.clone();

    if (speed > 0.001) {
      const dir = velocity.current.clone().normalize();
      const offset = dir.multiplyScalar(0.04);
      sternPos.sub(offset);
    }

    simMaterialRef.current.uMouse = sternPos;
    simMaterialRef.current.uVelocity = velocity.current;
    simMaterialRef.current.uTime = state.clock.elapsedTime;
    simMaterialRef.current.uResolution.set(size.width, size.height);

    const writeBuffer = frameRef.current % 2 === 0 ? simTargetA : simTargetB;
    const readBuffer = frameRef.current % 2 === 0 ? simTargetB : simTargetA;

    simMaterialRef.current.uTexture = readBuffer.texture;

    gl.setRenderTarget(writeBuffer);
    gl.render(sceneRef.current, cameraRef.current);
    gl.setRenderTarget(null);

    displayMaterialRef.current.uMask = writeBuffer.texture;
    frameRef.current++;
  });

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        {/* @ts-ignore */}
        <displayMaterial ref={displayMaterialRef} uTexture={texture} />
      </mesh>

      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          {/* @ts-ignore */}
          <simulationMaterial ref={simMaterialRef} />
        </mesh>,
        sceneRef.current,
      )}
    </>
  );
};

// --- 4. BOAT CURSOR ---
const BoatCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  const prevPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      const section = document.querySelector("section");
      if (section) {
        const rect = section.getBoundingClientRect();

        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          targetPos.current = { x: clientX, y: clientY };

          // Map to 0-1 range for the WebGL Shader
          globalPointer.x = (clientX - rect.left) / rect.width;
          // Invert Y for WebGL (which starts 0 at the bottom)
          globalPointer.y = 1.0 - (clientY - rect.top) / rect.height;

          if (cursorRef.current) {
            cursorRef.current.style.opacity = "1";
          }
        } else {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "0";
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let frameId: number;
    const animate = () => {
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.1;

      if (cursorRef.current && boatRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;

        const dx = currentPos.current.x - prevPos.current.x;
        const dy = currentPos.current.y - prevPos.current.y;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
          boatRef.current.style.transform = `rotate(${angle}deg)`;
        }
        prevPos.current = { ...currentPos.current };
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 -ml-8 -mt-8 h-16 w-16 will-change-transform"
    >
      <div
        ref={boatRef}
        className="h-full w-full transition-transform duration-300 ease-out"
      >
        <Image
          src="/icons/cursor.svg"
          alt="Boat Cursor"
          width={64}
          height={64}
          className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(0,198,219,0.6)]"
          priority
        />
      </div>
    </div>
  );
};

// --- 5. MAIN EXPORT ---
export default function InteractiveBanner() {
  return (
    <section
      // CHANGED: Mobile is now h-[75dvh]. Desktop remains xl:h-[calc(100dvh)]
      className="relative h-[75dvh] xl:h-[calc(100dvh)] w-full overflow-hidden bg-[#0D4168] cursor-none touch-none xl:touch-auto"
    >
      <BoatCursor />

      <div className="absolute inset-0 z-0">
        <Canvas>
          <FluidSystem />
        </Canvas>
      </div>

      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        {/* CHANGED: Container maintains the 50% relative height to center within the new 75dvh space */}
        <div className="relative w-full max-w-[85vw] md:max-w-[70vw] lg:max-w-[50vw] h-[50%] xl:h-[40vh] mix-blend-overlay mt-16 xl:mt-0">
          <Image
            src="/icons/final.svg"
            alt="Rent a boat in the heart of Athens"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
