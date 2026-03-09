'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Floating Torus ─────────────────────────────────── */
function FloatingTorus({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
    ref.current.rotation.y += 0.005 * speed;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.8, 0.25, 16, 48]} />
      <MeshDistortMaterial color={color} roughness={0.2} metalness={0.9} distort={0.2} speed={2} />
    </mesh>
  );
}

/* ─── Animated Icosahedron ───────────────────────────── */
function AnimatedIcosahedron({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#f97316"
        roughness={0.15}
        metalness={0.95}
        distort={0.35}
        speed={1.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ─── Wireframe Octahedron ───────────────────────────── */
function WireframeOctahedron({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.5) * 0.25;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#fb923c" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

/* ─── Glowing Sphere (central) ──────────────────────── */
function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    const targetScale = hovered ? 1.12 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh
        ref={ref}
        position={[2.5, 0.2, -1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color="#f97316"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/* ─── Orbiting ring of small spheres ─────────────────── */
function OrbitingParticles({ count, radius, color }: { count: number; radius: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push([Math.cos(angle) * radius, Math.sin(angle) * 0.6, Math.sin(angle) * radius]);
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
  });

  return (
    <group ref={groupRef} position={[2.5, 0.2, -1]}>
      {positions.map((pos, i) => (
        <Trail key={i} width={0.06} length={6} color={color} attenuation={(w) => w * w}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

/* ─── Floating Particles Background ──────────────────── */
function FloatingParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#f97316" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─── Wobble Ring ────────────────────────────────────── */
function WobbleRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[2.8, 0.02, 16, 100]} />
      <MeshWobbleMaterial color="#fb923c" factor={0.6} speed={1} transparent opacity={0.3} />
    </mesh>
  );
}

/* ─── Mouse-following camera ─────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.3 + 0.5, 0.02);
    camera.lookAt(1, 0, 0);
    // subtle breathing
    camera.position.z = 6 + Math.sin(t * 0.3) * 0.15;
  });
  return null;
}

/* ─── Main Scene ─────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[3, 2, -2]} intensity={2} color="#f97316" distance={12} />
      <pointLight position={[-4, -2, 3]} intensity={1} color="#fb923c" distance={10} />
      <spotLight position={[0, 8, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#f97316" />

      <GlowingSphere />
      <OrbitingParticles count={20} radius={2.8} color="#f97316" />
      <WobbleRing position={[2.5, 0.2, -1]} />

      <FloatingTorus position={[-3, 1.5, -2]} color="#ea580c" speed={1.2} />
      <FloatingTorus position={[-1, -2, -3]} color="#fb923c" speed={0.8} />

      <AnimatedIcosahedron position={[-4, -1, -4]} scale={0.6} />
      <AnimatedIcosahedron position={[5, 2.5, -3]} scale={0.4} />

      <WireframeOctahedron position={[0, 2.5, -2]} scale={0.5} />
      <WireframeOctahedron position={[5.5, -1.5, -2]} scale={0.35} />

      <FloatingParticles count={300} />

      <Stars radius={15} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />

      <CameraRig />

      {/* Fog for depth */}
      <fog attach="fog" args={['#050505', 5, 18]} />
    </>
  );
}

/* ─── Exported Component ─────────────────────────────── */
export default function ThreeScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
