'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NodeNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate ~40 node positions
  const { nodePositions, lineGeometry } = useMemo(() => {
    const count = 40;
    const positions: [number, number, number][] = [];
    const radius = 3.2;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.push([x, y, z]);
    }

    // Connect nodes that are close to each other
    const lineCoords: number[] = [];
    const maxDist = 1.9;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          lineCoords.push(...positions[i], ...positions[j]);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(lineCoords, 3)
    );

    return { nodePositions: positions, lineGeometry: geometry };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow ambient rotation
    groupRef.current.rotation.y += delta * 0.08;

    // Smoothly lean toward pointer position
    const targetRotX = -state.pointer.y * 0.35;
    const targetRotY = state.pointer.x * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 2.5
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -targetRotY * 0.2,
      delta * 2.5
    );
  });

  return (
    <group ref={groupRef}>
      {/* Connecting Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial
            color={idx % 3 === 0 ? '#8B5CF6' : '#22D3EE'}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
