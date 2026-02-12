"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import Image from "next/image"; // Ensure Image is imported
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";
import { useTexture, useFBO, shaderMaterial } from "@react-three/drei";

// --- 1. SIMULATION SHADER (The "Physics Engine") ---
const SimulationMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0), // This will now be the STERN position
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
      // Large waves - main curl pattern
      float wave1 = sin(distAlongPath * 8.0 + uTime * 1.5) * 0.025;
      // Medium waves - secondary ripples
      float wave2 = sin(distAlongPath * 15.0 - uTime * 2.0) * 0.015;
      // Small waves - fine detail
      float wave3 = sin(distAlongPath * 25.0 + uTime * 3.0) * 0.008;
      
      // Combine waves - makes the line itself wiggle
      float curlAmount = wave1 + wave2 + wave3;
      
      // Apply the curl to the spread (makes the V-lines wavy)
      float expectedSpread = baseSpread + curlAmount;
      
      // Distance from the V-line
      float distFromVLine = abs(distPerpendicular - expectedSpread);
      
      // TURBULENT WAKE EDGES - Multiple noise frequencies for realism
      // High frequency chop
      float noise1 = rand(uv * 30.0 + uTime * 0.8) * 0.5;
      // Medium frequency waves
      float noise2 = rand(uv * 12.0 - uTime * 0.3) * 0.8;
      // Low frequency undulation
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
      float edgeFoam = wakeSim.r;        // White foam on V-edges
      float centerDark = wakeSim.g;      // Dark turbulent water
      
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

  // Ping-Pong Buffers
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

  // PHYSICS STATE
  // We mirror the DOM boat logic here to keep them perfectly synced
  const position = useRef(new THREE.Vector2(0.5, 0.5)); // Current Lagged Pos
  const target = useRef(new THREE.Vector2(0.5, 0.5)); // Real Mouse Pos
  const velocity = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    // 1. SYNC PHYSICS (Match the DOM Boat)
    const mx = (state.pointer.x + 1) / 2;
    const my = (state.pointer.y + 1) / 2;
    target.current.set(mx, my);

    // Calculate Lag (Lerp 0.1 matches the BoatCursor)
    const oldPos = position.current.clone();
    position.current.lerp(target.current, 0.1);

    // Calculate Velocity vector
    velocity.current.subVectors(position.current, oldPos);

    if (!simMaterialRef.current || !displayMaterialRef.current) return;

    // 2. STERN CALCULATION (The Fix)
    // We need to emit the wake BEHIND the boat.
    // Normalized negative velocity vector * offset distance
    const speed = velocity.current.length();
    let sternPos = position.current.clone();

    if (speed > 0.001) {
      const dir = velocity.current.clone().normalize();
      // Offset: Pushes the wake generator back opposite to movement
      // 0.04 is roughly half the boat size in UV space
      const offset = dir.multiplyScalar(0.04);
      sternPos.sub(offset);
    }

    // 3. SIMULATION UPDATE
    simMaterialRef.current.uMouse = sternPos;
    simMaterialRef.current.uVelocity = velocity.current;
    simMaterialRef.current.uTime = state.clock.elapsedTime;
    simMaterialRef.current.uResolution.set(size.width, size.height);

    // Swap Buffers
    const writeBuffer = frameRef.current % 2 === 0 ? simTargetA : simTargetB;
    const readBuffer = frameRef.current % 2 === 0 ? simTargetB : simTargetA;

    simMaterialRef.current.uTexture = readBuffer.texture;

    gl.setRenderTarget(writeBuffer);
    gl.render(sceneRef.current, cameraRef.current);
    gl.setRenderTarget(null);

    // 4. DISPLAY UPDATE
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

// --- 4. BOAT CURSOR (Standard Lag Logic) ---
const BoatCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  const prevPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const section = document.querySelector("section");
      if (section) {
        const rect = section.getBoundingClientRect();

        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          targetPos.current = { x: e.clientX, y: e.clientY };
          // ADD THIS - Show the boat
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "1";
          }
        } else {
          // ADD THIS - Hide the boat when outside
          if (cursorRef.current) {
            cursorRef.current.style.opacity = "0";
          }
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId: number;
    const animate = () => {
      // Matches the shader lerp (0.1)
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
        {/* REPLACED SVG WITH IMAGE */}
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect if device is desktop (has mouse/pointer capability and screen width)
    const checkIsDesktop = () => {
      const hasPointer = window.matchMedia("(pointer: fine)").matches;
      const isWideScreen = window.innerWidth >= 1024;
      setIsDesktop(hasPointer && isWideScreen);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <section
      className={`relative h-[calc(100dvh)] w-full overflow-hidden bg-[#0D4168] ${isDesktop ? "cursor-none" : ""}`}
    >
      {/* Only show interactive elements on desktop */}
      {isDesktop && <BoatCursor />}

      <div className="absolute inset-0 z-0">
        {isDesktop ? (
          <Canvas>
            <FluidSystem />
          </Canvas>
        ) : (
          // Mobile: Just show static background image
          <Image
            src="/images/akti.jpg"
            alt="Beach background"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-auto mix-blend-overlay">
          <h1 className="group/text flex cursor-default flex-col items-center font-ubuntu text-[14vw] font-bold uppercase leading-[0.85] tracking-tight transition-all duration-500 md:text-[6vw] md:tracking-tighter">
            <span
              className="relative block transition-all duration-500 ease-out 
        
        /* --- MOBILE MAGIC FIX --- */
        /* 1. Fill with solid black. This 'masks' the lines behind it. */
        text-black
        /* 2. 'Screen' mode makes the black fill invisible, leaving only the white stroke. */
        mix-blend-screen
        /* 3. Solid white stroke (1px) */
        [-webkit-text-stroke:1px_#ffffff]
        /* 4. Global opacity for the ghost look */
        opacity-80

        /* --- DESKTOP REVERT (Original Style) --- */
        /* Go back to transparent text */
        md:text-transparent
        /* Reset blend mode so it doesn't mess with desktop */
        md:mix-blend-normal
        /* Original stroke settings */
        md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)]
        md:opacity-100"
            >
              <span className="absolute inset-0 text-white opacity-0 transition-opacity duration-500 group-hover/text:opacity-100">
                Rent a boat
              </span>
              Rent a boat
            </span>

            <span className="bg-linear-to-r from-white via-white to-white bg-clip-text text-transparent transition-all duration-500 group-hover/text:from-[#00C6DB] group-hover/text:to-[#0099aa]">
              <span className="italic">in the heart of athens</span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
