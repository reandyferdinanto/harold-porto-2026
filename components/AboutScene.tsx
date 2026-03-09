'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Trail } from '@react-three/drei';
import * as THREE from 'three';

/* ── Large wireframe dodecahedron — RIGHT SIDE ── */
function WireframeDodecahedron() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.06;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <group ref={ref} position={[3, 0, 0]}>
      <mesh>
        <dodecahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.25} emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>
      {/* Inner shape for depth */}
      <mesh>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#fb923c" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ── Spinning torus knot — LEFT SIDE ── */
function SpinningTorusKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.12;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });
  return (
    <mesh ref={ref} position={[-3, -0.5, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 128, 16]} />
      <meshStandardMaterial color="#fb923c" wireframe transparent opacity={0.18} emissive="#f97316" emissiveIntensity={0.2} />
    </mesh>
  );
}

/* ── Glowing distorted sphere ── */
function GlowSphere() {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh
        position={[4.5, 2, -1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color="#f97316"
          roughness={0.15}
          metalness={0.95}
          distort={hovered ? 0.5 : 0.3}
          speed={2}
          transparent
          opacity={0.65}
        />
      </mesh>
    </Float>
  );
}

/* ── Large orbit rings ── */
function OrbitRing({ radius, speed, tilt, position }: {
  radius: number; speed: number; tilt: number; position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} position={position} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color="#f97316" transparent opacity={0.3} emissive="#f97316" emissiveIntensity={0.8} />
    </mesh>
  );
}

/* ── Orbiting small spheres with trails ── */
function OrbitingSpheres({ radius, position }: { radius: number; position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 12;
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return arr;
  }, [radius, count]);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.5, 0, 0]}>
      {positions.map((pos, i) => (
        <Trail key={i} width={0.04} length={5} color="#f97316" attenuation={(w) => w * w}>
          <mesh position={pos}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={3} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

/* ── Floating particles ── */
function AboutParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#fb923c" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Floating wireframe shapes ── */
function FloatingShape({ position, scale, speed, type }: {
  position: [number, number, number]; scale: number; speed: number;
  type: 'octa' | 'ico' | 'tetra';
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {type === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {type === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {type === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.2} emissive="#f97316" emissiveIntensity={0.4} />
    </mesh>
  );
}

/* ── Camera subtly follows mouse ── */
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.3, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.2, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Full Scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 3, 2]} intensity={2} color="#f97316" distance={20} />
      <pointLight position={[-4, -2, 3]} intensity={1} color="#fb923c" distance={15} />
      <spotLight position={[0, 5, 5]} angle={0.4} penumbra={1} intensity={0.5} color="#f97316" />

      {/* Main shapes */}
      <WireframeDodecahedron />
      <SpinningTorusKnot />
      <GlowSphere />

      {/* Orbit rings around dodecahedron */}
      <OrbitRing radius={3} speed={0.08} tilt={0.6} position={[3, 0, 0]} />
      <OrbitRing radius={3.5} speed={-0.06} tilt={-0.4} position={[3, 0, 0]} />

      {/* Orbiting spheres with trails */}
      <OrbitingSpheres radius={2.8} position={[3, 0, 0]} />

      {/* Floating shapes */}
      <FloatingShape position={[-5.5, 2, -1]} scale={0.5} speed={0.2} type="octa" />
      <FloatingShape position={[6, -2, -1]} scale={0.4} speed={0.25} type="ico" />
      <FloatingShape position={[-2, -3, -2]} scale={0.35} speed={0.18} type="tetra" />
      <FloatingShape position={[1, 3, -2]} scale={0.3} speed={0.22} type="octa" />

      {/* Particles & ambience */}
      <AboutParticles count={250} />

      <CameraRig />
      <fog attach="fog" args={['#050505', 7, 20]} />
    </>
  );
}

/* ── Exported Component ── */
export default function AboutScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
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
