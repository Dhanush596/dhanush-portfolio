'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { TouchSensorScene } from './TouchSensorScene';

interface TouchSensorCanvasProps {
  mode?: 'fluid' | 'wireframe';
}

export default function TouchSensorCanvas({ mode = 'fluid' }: TouchSensorCanvasProps) {
  return (
    <div style={{ pointerEvents: 'none' }} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      <Canvas
        style={{ pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = 'none';
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.25]}
      >
        <TouchSensorScene mode={mode} />
      </Canvas>
    </div>
  );
}
