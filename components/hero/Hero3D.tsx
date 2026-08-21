"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingPoster({ posterUrl }: { posterUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = new THREE.TextureLoader().load(posterUrl);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    const targetX = (mouse.x * viewport.width) / 80;
    const targetY = (mouse.y * viewport.height) / 80;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 4.2]} />
        <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function Atmosphere() {
  const count = 200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 12;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FFC857" transparent opacity={0.6} />
    </points>
  );
}

export default function Hero3D({ posterUrl }: { posterUrl: string }) {
  return (
    <div className="relative w-full h-[80vh] bg-[#050508] overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#FF2A54" />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#FFC857" />
        
        <FloatingPoster posterUrl={posterUrl} />
        <Atmosphere />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-[#050508] via-transparent to-transparent">
        <div className="max-w-2xl pointer-events-auto">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-widest text-[#00F0FF] uppercase bg-[#00F0FF]/10 rounded-full border border-[#00F0FF]/30 backdrop-blur-md">
            Estreno Exclusivo IMAX 3D
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            CINE SOLAR
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            La experiencia cinematográfica más avanzada de Tucumán.
          </p>
        </div>
      </div>
    </div>
  );
}