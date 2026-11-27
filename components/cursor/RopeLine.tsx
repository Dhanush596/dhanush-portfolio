'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { Line } from '@react-three/drei';
import { PUPPET_CONFIG } from '@/lib/puppetConfig';

interface RopeLineProps {
  anchorRef: React.RefObject<RapierRigidBody>;
  hipRef: React.RefObject<RapierRigidBody>;
  color?: string;
  opacity?: number;
}

const SEGMENTS = 16;

export function RopeLine({
  anchorRef,
  hipRef,
  color = PUPPET_CONFIG.colors.rope,
  opacity = 0.65,
}: RopeLineProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineRef = useRef<any>(null);

  useFrame(() => {
    if (!anchorRef.current || !hipRef.current || !lineRef.current) return;

    const a = anchorRef.current.translation();
    const h = hipRef.current.translation();

    // Guard against NaN or uninitialized coordinates
    if (
      !Number.isFinite(a.x) ||
      !Number.isFinite(a.y) ||
      !Number.isFinite(h.x) ||
      !Number.isFinite(h.y)
    ) {
      if (lineRef.current) lineRef.current.visible = false;
      return;
    }

    if (lineRef.current) lineRef.current.visible = true;

    const dist = Math.hypot(a.x - h.x, a.y - h.y);
    const sag = Math.min(0.25, Math.max(0.04, 0.15 - dist * 0.1));

    const midX = (a.x + h.x) / 2;
    const midY = (a.y + h.y) / 2 - sag;
    const midZ = (a.z + h.z) / 2;

    const flatCoords: number[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const oneMinusT = 1 - t;
      const c0 = oneMinusT * oneMinusT;
      const c1 = 2 * oneMinusT * t;
      const c2 = t * t;

      flatCoords.push(
        c0 * a.x + c1 * midX + c2 * h.x,
        c0 * a.y + c1 * midY + c2 * h.y,
        c0 * a.z + c1 * midZ + c2 * h.z
      );
    }

    if (lineRef.current.geometry?.setPositions) {
      lineRef.current.geometry.setPositions(flatCoords);
    }
  });

  // Initial safe points (straight line down)
  const initialPoints = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      pts.push([0, -0.5 * t, 0]);
    }
    return pts;
  }, []);

  return (
    <Line
      ref={lineRef}
      points={initialPoints}
      color={color}
      lineWidth={1.6}
      transparent
      opacity={opacity}
    />
  );
}
