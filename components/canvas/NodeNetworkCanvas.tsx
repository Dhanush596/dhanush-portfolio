'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { NodeNetworkScene } from './NodeNetworkScene';

export default function NodeNetworkCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <NodeNetworkScene />
      </Canvas>
    </div>
  );
}
