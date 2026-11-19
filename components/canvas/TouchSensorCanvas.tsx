'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { TouchSensorScene } from './TouchSensorScene';

interface TouchSensorCanvasProps {
  mode?: 'fluid' | 'wireframe';
}

export default function TouchSensorCanvas({ mode = 'fluid' }: TouchSensorCanvasProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <TouchSensorScene mode={mode} />
      </Canvas>
    </div>
  );
}
