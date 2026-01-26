"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

// --- 1. THE "SICK" SHADER (GLSL) ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uVelo;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 center = uv - uMouse;
    float dist = length(center);
    float strength = smoothstep(0.5, 0.0, dist) * uVelo * 2.5;
    uv.x += (center.x / dist) * strength * 0.15;
    uv.y += (center.y / dist) * strength * 0.15;
    uv.x += sin(uv.y * 5.0 + uTime * 0.5) * 0.005;
    uv.y += cos(uv.x * 5.0 + uTime * 0.5) * 0.005;
    vec4 color = texture2D(uTexture, uv);
    vec4 deepBlue = vec4(0.05, 0.25, 0.41, 1.0);
    gl_FragColor = mix(color, deepBlue, 0.3); 
  }
`;

// --- 2. THE LUXURY BOAT CURSOR ---
const BoatCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  const prevPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId: number;

    const animate = () => {
      // Smooth lag effect
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.1;

      if (cursorRef.current && boatRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;

        const dx = currentPos.current.x - prevPos.current.x;
        const dy = currentPos.current.y - prevPos.current.y;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          // +90 deg offset for correct orientation
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
        {/* CUSTOM YACHT SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_20px_rgba(0,198,219,0.6)]"
        >
          <path
            d="M50 5 C 65 25, 75 55, 70 90 L 50 95 L 30 90 C 25 55, 35 25, 50 5 Z"
            fill="white"
          />
          <path
            d="M50 35 C 58 40, 60 55, 50 60 C 40 55, 42 40, 50 35 Z"
            fill="#00C6DB"
          />
          <path
            d="M50 15 C 55 25, 60 40, 60 85 H 40 C 40 40, 45 25, 50 15 Z"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          <rect x="35" y="90" width="6" height="4" rx="1" fill="#00C6DB" />
          <rect x="59" y="90" width="6" height="4" rx="1" fill="#00C6DB" />
        </svg>
      </div>
    </div>
  );
};

// --- 3. THE FLUID WEBGL PLANE ---
const FluidPlane = () => {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/images/locations-frame-4.png");

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelo: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture],
  );

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentVelo = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();

    const x = (state.pointer.x + 1) / 2;
    const y = (state.pointer.y + 1) / 2;

    targetMouse.current.set(x, y);
    const mouseDist = targetMouse.current.distanceTo(
      material.uniforms.uMouse.value,
    );

    material.uniforms.uMouse.value.lerp(targetMouse.current, 0.1);
    currentVelo.current = THREE.MathUtils.lerp(
      currentVelo.current,
      mouseDist,
      0.1,
    );
    material.uniforms.uVelo.value = currentVelo.current;
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

// --- 4. MAIN EXPORT ---
export default function InteractiveBanner() {
  return (
    <section className="relative h-[calc(100dvh)] w-full overflow-hidden bg-[#0D4168] cursor-none">
      {/* RENDER THE BOAT CURSOR */}
      <BoatCursor />

      {/* LAYER 1: WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <FluidPlane />
        </Canvas>
      </div>

      {/* LAYER 2: HTML Overlay */}
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-auto mix-blend-overlay">
          <h1 className="group/text flex cursor-default flex-col items-center font-ubuntu text-[12vw] font-bold uppercase leading-[0.85] tracking-tighter text-transparent transition-all duration-500 md:text-[9vw]">
            {/* Top Line: Outline -> Solid */}
            <span
              className="relative block transition-all duration-500 ease-out"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
            >
              <span className="absolute inset-0 text-white opacity-0 transition-opacity duration-500 group-hover/text:opacity-100">
                Rent a boat
              </span>
              Rent a boat
            </span>

            {/* Bottom Line: White -> CLEAN CYAN GRADIENT (No Shadow) */}
            <span className="bg-linear-to-r from-white via-white to-white bg-clip-text text-transparent transition-all duration-500 group-hover/text:from-[#00C6DB] group-hover/text:to-[#0099aa]">
              <span className="italic">15min from Athens</span>
            </span>
          </h1>

          <div className="mt-12 overflow-hidden">
            <p className="translate-y-10 animate-[slideUp_1s_ease-out_0.5s_forwards] font-open text-lg font-light tracking-[0.2em] text-white opacity-0">
              NO LICENSE REQUIRED FOR SELECT VESSELS
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER: Scroll Indicator Only */}
      <div className="absolute bottom-12 right-12 z-20 hidden flex-col items-center gap-6 md:flex">
        <span className="writing-vertical font-ubuntu text-[10px] font-bold tracking-[0.3em] text-white/50 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="h-10 w-px bg-white/10">
          <div className="h-full w-full animate-slide-down bg-[#00C6DB]"></div>
        </div>
      </div>
    </section>
  );
}
