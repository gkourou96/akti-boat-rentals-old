"use client";

import React, { useRef, useEffect } from "react";
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

// Global store for raw, normalized touch/mouse coordinates.
// This safely bridges the React DOM events to the WebGL Canvas without relying on R3F's internal pointer which gets swallowed on mobile!
const pointerState = {
  x: -1000,
  y: -1000,
  normX: 0.5,
  normY: 0.5,
  isActive: false,
};

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
      
      // Decay the previous frame
      vec4 past = texture2D(uTexture, uv) * 0.96;

      vec2 mouseUV = uMouse;
      float speed = length(uVelocity) * 100.0;
      
      // Only create wake if moving
      if (speed < 0.005) {
        gl_FragColor = past;
        return;
      }

      // Direction of movement
      vec2 dir = normalize(uVelocity);
      
      // Vector from boat to current pixel
      vec2 toPixel = (uv - mouseUV) * aspect;
      
      // Distance behind the boat (along movement direction)
      float distAlongPath = dot(toPixel, -dir);
      
      // Distance perpendicular to movement
      vec2 perpDir = vec2(-dir.y, dir.x);
      float distPerpendicular = abs(dot(toPixel, perpDir));
      
      // KELVIN WAKE ANGLE: 19.47 degrees (classic physics)
      float kelvinAngle = 0.34; // radians (~19.47°)
      
      // V-shaped wake edges with CURLY/WAVY PATH
      float baseSpread = distAlongPath * tan(kelvinAngle);
      
      // Add multiple sine waves to make the V-lines curly
      float wave1 = sin(distAlongPath * 8.0 + uTime * 1.5) * 0.025;
      float wave2 = sin(distAlongPath * 15.0 - uTime * 2.0) * 0.015;
      float wave3 = sin(distAlongPath * 25.0 + uTime * 3.0) * 0.008;
      
      // Combine waves - makes the line itself wiggle
      float curlAmount = wave1 + wave2 + wave3;
      
      // Apply the curl to the spread (makes the V-lines wavy)
      float expectedSpread = baseSpread + curlAmount;
      
      // Distance from the V-line
      float distFromVLine = abs(distPerpendicular - expectedSpread);
      
      // TURBULENT WAKE EDGES - Multiple noise frequencies for realism
      float noise1 = rand(uv * 30.0 + uTime * 0.8) * 0.5;
      float noise2 = rand(uv * 12.0 - uTime * 0.3) * 0.8;
      float noise3 = sin(distAlongPath * 15.0 + uTime * 2.0) * 0.3;
      
      // Combine noise layers - creates organic, wavy edges
      float edgeNoise = (noise1 * 0.4 + noise2 * 0.4 + noise3 * 0.2) * 0.015;
      
      // Add noise to the distance check - makes edges wavy
      float turbulentDist = distFromVLine + edgeNoise;
      
      // Sharp but irregular wake edge
      float edgeSharpness = 0.008 * (1.0 + speed * 2.0);
      float vWake = smoothstep(edgeSharpness, 0.0, turbulentDist);
      
      // Only render wake behind the boat
      vWake *= smoothstep(-0.02, 0.0, distAlongPath);
      
      // Fade with distance
      vWake *= smoothstep(0.3, 0.0, distAlongPath);
      
      // Add breaking wave patterns - intermittent foam chunks
      float breakingWaves = rand(vec2(distAlongPath * 8.0, distPerpendicular * 5.0)) * rand(vec2(uTime * 0.5, distAlongPath * 3.0));
      breakingWaves = smoothstep(0.7, 0.9, breakingWaves) * 0.3;
      vWake += breakingWaves * smoothstep(0.15, 0.0, distAlongPath);
      
      // Center turbulence (darker disturbed water)
      float centerTurbulence = 0.0;
      if (distAlongPath > 0.0 && distPerpendicular < expectedSpread) {
        centerTurbulence = smoothstep(expectedSpread, 0.0, distPerpendicular) * 0.4;
        centerTurbulence *= smoothstep(0.15, 0.0, distAlongPath);
      }
      
      // Combine: R = white foam edges, G = dark turbulent center
      vec4 currentWake = vec4(
        vWake * (0.8 + speed * 0.2),  // Edge foam
        centerTurbulence,              // Center turbulence
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
      
      // Sample the physics simulation
      vec4 wakeSim = texture2D(uMask, uv);
      float edgeFoam = wakeSim.r;        
      float centerDark = wakeSim.g;      
      
      // Base distortion from wake edges
      vec2 displacement = vec2(edgeFoam * 0.02);
      vec2 distortedUV = uv - displacement;
      vec4 imageColor = texture2D(uTexture, distortedUV);
      
      // White foam color (slight blue tint like in screenshot)
      vec4 foamColor = vec4(0.9, 0.95, 1.0, 1.0);
      
      // Dark turbulent water (slightly darker/greener than base)
      vec4 darkWater = imageColor * vec4(0.7, 0.75, 0.8, 1.0);
      
      // Apply foam to edges (sharp, bright)
      float foamMask = smoothstep(0.3, 0.7, edgeFoam);
      vec4 withFoam = mix(imageColor, foamColor, foamMask * 0.9);
      
      // Apply darker turbulence in center
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

  let physicsInitialized = false;

  useFrame((state) => {
    // 1. SYNC PHYSICS: Force target to use our globally mapped coordinates instead of R3F's state.pointer
    target.current.set(pointerState.normX, pointerState.normY);

    if (!pointerState.isActive) {
      physicsInitialized = false;
    }

    // Instantly snap physics on first touch so it doesn't draw a giant line across the screen from (0,0)
    if (pointerState.isActive && !physicsInitialized) {
      position.current.copy(target.current);
      physicsInitialized = true;
    }

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

  const currentPos = useRef({ x: pointerState.x, y: pointerState.y });
  const prevPos = useRef({ x: pointerState.x, y: pointerState.y });

  useEffect(() => {
    let frameId: number;
    let hasInitialized = false;

    const animate = () => {
      if (pointerState.isActive) {
        if (cursorRef.current) cursorRef.current.style.opacity = "1";

        // Instantly snap visual boat on first touch
        if (!hasInitialized) {
          currentPos.current.x = pointerState.x;
          currentPos.current.y = pointerState.y;
          hasInitialized = true;
        }
      } else {
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
        hasInitialized = false;
      }

      currentPos.current.x += (pointerState.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (pointerState.y - currentPos.current.y) * 0.1;

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
  const sectionRef = useRef<HTMLElement>(null);

  // Directly handle coordinate updates relative to the section's actual size
  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    pointerState.x = clientX;
    pointerState.y = clientY;

    // Map to 0-1 range for the WebGL Shader
    pointerState.normX = (clientX - rect.left) / rect.width;
    // Invert Y for WebGL (which starts 0 at the bottom)
    pointerState.normY = 1.0 - (clientY - rect.top) / rect.height;

    pointerState.isActive = true;
  };

  const handleMouseMove = (e: React.MouseEvent) =>
    updateCoordinates(e.clientX, e.clientY);
  const handleTouchStart = (e: React.TouchEvent) =>
    updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove = (e: React.TouchEvent) =>
    updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
  const handleEnd = () => {
    pointerState.isActive = false;
  };

  return (
    <section
      ref={sectionRef}
      // CHANGED: Mobile is now h-[75dvh]. Desktop strictly remains xl:h-[calc(100dvh)]
      className="relative h-[75dvh] xl:h-[calc(100dvh)] w-full overflow-hidden bg-[#0D4168] cursor-none"
    >
      <BoatCursor />

      <div className="absolute inset-0 z-0">
        {/* ADDED: pointerEvents: 'none' ensures R3F doesn't steal touches on mobile */}
        <Canvas style={{ pointerEvents: "none" }}>
          <FluidSystem />
        </Canvas>
      </div>

      {/* DEDICATED HIT AREA: This invisible layer perfectly catches all touches and mouse movements */}
      {/* touch-none prevents mobile from scrolling only when dragging inside this section */}
      <div
        className="absolute inset-0 z-20 touch-none xl:touch-auto"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
        onMouseLeave={handleEnd}
      />

      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        {/* Container maintains the 50% relative height to center within the new 75dvh space */}
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
