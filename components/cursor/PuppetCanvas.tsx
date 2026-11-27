'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PUPPET_CONFIG } from '@/lib/puppetConfig';
import { PuppetBody } from './PuppetBody';
import { usePuppetState } from './usePuppetState';

interface PuppetCanvasProps {
  isModalOpen?: boolean;
}

export function PuppetCanvas({ isModalOpen = false }: PuppetCanvasProps) {
  const {
    actionState,
    mouseWorld,
    mouseDelta,
    reachTarget,
    scrollVelocity,
    opacity,
    squash,
  } = usePuppetState();

  const [isVisible, setIsVisible] = useState(true);

  // Performance: Detect document visibility (pause when backgrounded)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Don't render if tab is hidden or modal is open
  if (!isVisible || isModalOpen) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
      className="fixed inset-0 pointer-events-none z-[45] overflow-hidden select-none"
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = 'none';
        }}
        orthographic
        camera={{
          position: [0, 0, 50],
          zoom: PUPPET_CONFIG.unitToPx,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: true,
        }}
        frameloop="always"
        className="w-full h-full pointer-events-none"
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[4, 8, 12]} intensity={2.2} />
        <directionalLight position={[-4, -4, 6]} intensity={0.8} />
        <directionalLight position={[0, 0, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          <PuppetBody
            mouseWorld={mouseWorld}
            mouseDelta={mouseDelta}
            actionState={actionState}
            reachTarget={reachTarget}
            scrollVelocity={scrollVelocity}
            opacity={opacity}
            squash={squash}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
