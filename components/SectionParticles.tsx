'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating particles for section backgrounds ─── */
function Particles({ count, color, speed, spread }: { count: number; color: string; speed: number; spread: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.3;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.03) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function FloatingShape({ position, color, type }: { position: [number, number, number]; color: string; type: 'oct' | 'tet' | 'ring' }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      {type === 'oct' && <octahedronGeometry args={[0.3, 0]} />}
      {type === 'tet' && <tetrahedronGeometry args={[0.25, 0]} />}
      {type === 'ring' && <torusGeometry args={[0.4, 0.02, 8, 32]} />}
      <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function Scene({ variant }: { variant: 'warm' | 'cool' | 'mixed' }) {
  const colors = {
    warm: { primary: '#f97316', secondary: '#fb923c' },
    cool: { primary: '#f97316', secondary: '#fbbf24' },
    mixed: { primary: '#ea580c', secondary: '#fb923c' },
  };
  const c = colors[variant];

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 3, 0]} intensity={0.3} color={c.primary} distance={15} />
      <Particles count={80} color={c.primary} speed={1} spread={12} />
      <FloatingShape position={[-5, 1, -3]} color={c.primary} type="oct" />
      <FloatingShape position={[5, -1, -4]} color={c.secondary} type="tet" />
      <FloatingShape position={[0, 2, -5]} color={c.secondary} type="ring" />
      <fog attach="fog" args={['#050505', 4, 15]} />
    </>
  );
}

export default function SectionParticles({ variant = 'warm' }: { variant?: 'warm' | 'cool' | 'mixed' }) {
  return (
    <div className="section-3d-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene variant={variant} />
      </Canvas>
    </div>
  );
}
