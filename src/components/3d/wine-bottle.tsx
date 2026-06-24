"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import type { Group, Mesh } from "three";

/**
 * Garrafa de vinho procedural (sem ficheiro .glb).
 *
 * Cada parte é um grupo independente que faz "lerp" entre a posição montada
 * e a posição desmontada conforme a prop `exploded`. A rotação idle pausa
 * quando a tab não está ativa (document.hidden) ou com prefers-reduced-motion.
 */

interface BottleProps {
  exploded: boolean;
}

// Offsets verticais (e laterais) de cada parte quando desmontada.
const EXPLODE = {
  cork: 1.9,
  capsule: 1.35,
  neck: 0.7,
  shoulder: 0.25,
  label: 0, // o rótulo afasta-se no eixo X
  wine: -0.35,
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Bottle({ exploded }: BottleProps) {
  const reduce = useReducedMotion();
  const root = useRef<Group>(null);
  const cork = useRef<Group>(null);
  const capsule = useRef<Group>(null);
  const neck = useRef<Group>(null);
  const shoulder = useRef<Group>(null);
  const label = useRef<Group>(null);
  const wine = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const k = Math.min(1, delta * 6); // suavidade do lerp independente de FPS
    const t = exploded ? 1 : 0;

    if (cork.current)
      cork.current.position.y = lerp(cork.current.position.y, 1.95 + EXPLODE.cork * t, k);
    if (capsule.current)
      capsule.current.position.y = lerp(capsule.current.position.y, 1.62 + EXPLODE.capsule * t, k);
    if (neck.current)
      neck.current.position.y = lerp(neck.current.position.y, 1.35 + EXPLODE.neck * t, k);
    if (shoulder.current)
      shoulder.current.position.y = lerp(shoulder.current.position.y, 0.95 + EXPLODE.shoulder * t, k);
    if (label.current) {
      label.current.position.x = lerp(label.current.position.x, 1.4 * t, k);
      label.current.position.z = lerp(label.current.position.z, 0.6 * t, k);
    }
    if (wine.current)
      wine.current.position.y = lerp(wine.current.position.y, -0.1 + EXPLODE.wine * t, k);

    // Rotação idle subtil (pausa com reduced motion ou quando desmontada)
    if (root.current && !reduce && !exploded) {
      root.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={root} position={[0, -0.4, 0]} scale={1.1}>
      {/* Corpo da garrafa (vidro vínico translúcido) */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 1.7, 48]} />
        <meshStandardMaterial
          color="#3a0c12"
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Vinho no interior */}
      <mesh ref={wine} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 1.3, 40]} />
        <meshStandardMaterial color="#5b0e14" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Ombro (tapered) */}
      <group ref={shoulder} position={[0, 0.95, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.52, 0.4, 48]} />
          <meshStandardMaterial color="#3a0c12" roughness={0.15} transparent opacity={0.92} />
        </mesh>
      </group>

      {/* Gargalo */}
      <group ref={neck} position={[0, 1.35, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.2, 0.55, 32]} />
          <meshStandardMaterial color="#3a0c12" roughness={0.15} transparent opacity={0.92} />
        </mesh>
      </group>

      {/* Cápsula (foil dourado) */}
      <group ref={capsule} position={[0, 1.62, 0]}>
        <mesh>
          <cylinderGeometry args={[0.205, 0.205, 0.32, 32]} />
          <meshStandardMaterial color="#c9a24b" roughness={0.25} metalness={0.85} />
        </mesh>
      </group>

      {/* Rolha */}
      <group ref={cork} position={[0, 1.95, 0]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.3, 24]} />
          <meshStandardMaterial color="#a9744f" roughness={0.9} metalness={0} />
        </mesh>
      </group>

      {/* Rótulo (label) */}
      <group ref={label} position={[0, -0.1, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.53, 0.53, 0.62, 48, 1, true, -0.9, 1.8]} />
          <meshStandardMaterial color="#f7f1e8" roughness={0.6} side={2} />
        </mesh>
        <mesh position={[0, 0.22, 0.535]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.08]} />
          <meshStandardMaterial color="#7b1e2b" />
        </mesh>
      </group>
    </group>
  );
}
