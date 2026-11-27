'use client';

import { useState, useEffect, useRef } from 'react';
import { PUPPET_CONFIG } from '@/lib/puppetConfig';

export type PuppetActionState =
  | 'IDLE_DANGLE'
  | 'PULLED'
  | 'SCROLLING_DOWN'
  | 'SCROLLING_UP'
  | 'REACH'
  | 'JUMP'
  | 'WAVE'
  | 'INPUT_AVOID'
  | 'WORDMARK_DANCE';

export interface ReachTarget {
  x: number; // World coordinates
  y: number; // World coordinates
}

export interface PuppetStateReturn {
  actionState: PuppetActionState;
  mouseWorld: { x: number; y: number };
  mouseDelta: { x: number; y: number };
  scrollVelocity: number;
  reachTarget: ReachTarget | null;
  opacity: number;
  squash: number;
  triggerJump: () => void;
}

export function usePuppetState(): PuppetStateReturn {
  const [actionState, setActionState] = useState<PuppetActionState>('IDLE_DANGLE');
  const [opacity, setOpacity] = useState(1.0);
  const [squash, setSquash] = useState(1.0);
  const [reachTarget, setReachTarget] = useState<ReachTarget | null>(null);
  const [mouseWorld, setMouseWorld] = useState({ x: 0, y: 0 });
  const [mouseDelta, setMouseDelta] = useState({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const actionStateRef = useRef<PuppetActionState>('IDLE_DANGLE');
  const opacityRef = useRef(1.0);
  const mouseWorldRef = useRef({ x: 0, y: 0 });
  const prevMouseWorldRef = useRef({ x: 0, y: 0 });
  const mouseDeltaRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const lastMouseMoveTimeRef = useRef(0);
  const jumpActiveRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastMouseMoveTimeRef.current = Date.now();

    let rafId: number | null = null;

    // Track mouse move in world coords
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTimeRef.current = Date.now();

      const wx = (e.clientX - window.innerWidth / 2) / PUPPET_CONFIG.unitToPx;
      const wy = -(e.clientY - window.innerHeight / 2) / PUPPET_CONFIG.unitToPx;

      const delta = {
        x: wx - mouseWorldRef.current.x,
        y: wy - mouseWorldRef.current.y,
      };

      mouseDeltaRef.current = delta;
      prevMouseWorldRef.current = { ...mouseWorldRef.current };
      mouseWorldRef.current = { x: wx, y: wy };

      // Throttle mouse coordinates state updates to 1 per animation frame
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          setMouseWorld({ x: wx, y: wy });
          setMouseDelta(delta);
        });
      }

      // Inspect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      const isWordmark =
        target.closest('.stroke-text') !== null ||
        target.closest('#mega-footer-wordmark') !== null;

      const clickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor]') ||
        target.closest('[role="button"]');

      let nextState: PuppetActionState = 'IDLE_DANGLE';
      let nextOpacity = 1.0;
      let nextTarget: ReachTarget | null = null;

      if (isInput) {
        nextState = 'INPUT_AVOID';
        nextOpacity = 0.25;
      } else if (isWordmark) {
        nextState = 'WORDMARK_DANCE';
      } else if (clickable) {
        const rect = (clickable as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const twx = (centerX - window.innerWidth / 2) / PUPPET_CONFIG.unitToPx;
        const twy = -(centerY - window.innerHeight / 2) / PUPPET_CONFIG.unitToPx;
        nextTarget = { x: twx, y: twy };
        nextState = 'REACH';
      } else {
        const speed = Math.hypot(delta.x, delta.y);
        if (speed > PUPPET_CONFIG.mousePulledThreshold) {
          nextState = 'PULLED';
        }
      }

      // Only dispatch state updates when the state value actually changes
      if (actionStateRef.current !== nextState) {
        actionStateRef.current = nextState;
        setActionState(nextState);
      }
      if (opacityRef.current !== nextOpacity) {
        opacityRef.current = nextOpacity;
        setOpacity(nextOpacity);
      }
      setReachTarget(nextTarget);
    };

    // Track mousedown / click for Jump reaction
    const handleMouseDown = () => {
      jumpActiveRef.current = true;
      actionStateRef.current = 'JUMP';
      setActionState('JUMP');
      setSquash(PUPPET_CONFIG.squashFactor);

      setTimeout(() => {
        setSquash(1.0);
        jumpActiveRef.current = false;
      }, 250);
    };

    // Track scroll velocity via Lenis or fallback window scroll
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const rawDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Smooth scroll velocity
      scrollVelocityRef.current = rawDelta * 0.05;
      setScrollVelocity(rawDelta * 0.05);

      if (Math.abs(scrollVelocityRef.current) > 0.08) {
        const nextState = scrollVelocityRef.current > 0 ? 'SCROLLING_DOWN' : 'SCROLLING_UP';
        if (actionStateRef.current !== nextState) {
          actionStateRef.current = nextState;
          setActionState(nextState);
        }
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocityRef.current = 0;
        setScrollVelocity(0);
        if (!jumpActiveRef.current && actionStateRef.current !== 'IDLE_DANGLE') {
          actionStateRef.current = 'IDLE_DANGLE';
          setActionState('IDLE_DANGLE');
        }
      }, 150);
    };

    // Idle timer checker (e.g. 4 seconds idle -> WAVE)
    const idleInterval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastMouseMoveTimeRef.current;
      if (
        idleTime > PUPPET_CONFIG.idleDelayMs &&
        actionStateRef.current === 'IDLE_DANGLE' &&
        Math.abs(scrollVelocityRef.current) < 0.02
      ) {
        actionStateRef.current = 'WAVE';
        setActionState('WAVE');
      }
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(idleInterval);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return {
    actionState,
    mouseWorld,
    mouseDelta,
    scrollVelocity,
    reachTarget,
    opacity,
    squash,
    triggerJump: () => {
      jumpActiveRef.current = true;
      setActionState('JUMP');
      setSquash(PUPPET_CONFIG.squashFactor);
      setTimeout(() => {
        setSquash(1.0);
        jumpActiveRef.current = false;
      }, 250);
    },
  };
}
