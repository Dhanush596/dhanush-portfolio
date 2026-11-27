'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { PUPPET_CONFIG } from '@/lib/puppetConfig';
import { ReachTarget, PuppetActionState } from './usePuppetState';

interface PuppetBodyProps {
  mouseWorld: { x: number; y: number };
  mouseDelta: { x: number; y: number };
  actionState: PuppetActionState;
  reachTarget: ReachTarget | null;
  scrollVelocity: number;
  opacity: number;
  squash: number;
}

const ROPE_SEGMENTS = 16;

export function PuppetBody({
  mouseWorld,
  mouseDelta,
  actionState,
  reachTarget,
  scrollVelocity,
  opacity,
  squash,
}: PuppetBodyProps) {
  // Hierarchical Scene Graph Refs
  const rootGroupRef = useRef<THREE.Group>(null);
  const hipGroupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const leftShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const rightShoulderRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);

  const leftHipRef = useRef<THREE.Group>(null);
  const leftKneeRef = useRef<THREE.Group>(null);
  const rightHipRef = useRef<THREE.Group>(null);
  const rightKneeRef = useRef<THREE.Group>(null);

  const shadowRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ropeLineRef = useRef<any>(null);

  // Simulation physics state
  const isInitialized = useRef(false);
  const anchorPos = useRef({ x: 0, y: 0 });
  const hipPos = useRef({ x: 0, y: -0.70 });
  const hipVel = useRef({ x: 0, y: 0 });

  const currentRopeLen = useRef(PUPPET_CONFIG.ropeLength);
  const runCyclePhase = useRef(0);
  const smoothedSpineZ = useRef(0);
  const smoothedHipTiltZ = useRef(0);
  const smoothedYawY = useRef(0);

  // Rotational angles for ragdoll limbs
  const curLeftArmAngle = useRef(0.2);
  const curLeftElbowAngle = useRef(0.25);
  const curRightArmAngle = useRef(-0.2);
  const curRightElbowAngle = useRef(0.25);

  const curLeftLegAngle = useRef(0);
  const curLeftKneeAngle = useRef(-0.1);
  const curRightLegAngle = useRef(0);
  const curRightKneeAngle = useRef(-0.1);

  // Eye blink timer
  const nextBlinkTime = useRef(3.0);
  const isBlinking = useRef(false);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // Initialize position at mouse so it never spawns far away
  useEffect(() => {
    if (
      !isInitialized.current &&
      Number.isFinite(mouseWorld.x) &&
      Number.isFinite(mouseWorld.y) &&
      (mouseWorld.x !== 0 || mouseWorld.y !== 0)
    ) {
      anchorPos.current = { x: mouseWorld.x, y: mouseWorld.y };
      hipPos.current = { x: mouseWorld.x, y: mouseWorld.y - PUPPET_CONFIG.ropeLength };
      hipVel.current = { x: 0, y: 0 };
      isInitialized.current = true;
    }
  }, [mouseWorld.x, mouseWorld.y]);

  // Memoized Three.js Materials (Warm wooden mannequin, vibrant shirt, clear contrast)
  const materials = useMemo(() => {
    const isTrans = opacity < 0.99;
    return {
      wood: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PUPPET_CONFIG.colors.wood), // Warm beechwood #E8C498
        roughness: 0.45,
        metalness: 0.06,
        transparent: isTrans,
        opacity,
      }),
      woodDark: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C69968'), // Warm darker wood accent
        roughness: 0.5,
        metalness: 0.05,
        transparent: isTrans,
        opacity,
      }),
      shirt: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PUPPET_CONFIG.colors.shirt), // Royal blue
        roughness: 0.35,
        metalness: 0.12,
        transparent: isTrans,
        opacity,
      }),
      whiteTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFFFF'), // Crisp white collar/trim
        roughness: 0.3,
        metalness: 0.05,
        transparent: isTrans,
        opacity,
      }),
      popScarf: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PUPPET_CONFIG.colors.scarf), // Vivid coral red
        roughness: 0.45,
        metalness: 0.05,
        transparent: isTrans,
        opacity,
      }),
      shoes: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PUPPET_CONFIG.colors.shoes), // Dark slate
        roughness: 0.3,
        metalness: 0.15,
        transparent: isTrans,
        opacity,
      }),
      ring: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#CBD5E1'),
        roughness: 0.2,
        metalness: 0.85,
      }),
      eyeWhite: new THREE.MeshBasicMaterial({ color: '#FFFFFF' }),
      eyePupil: new THREE.MeshBasicMaterial({ color: '#0F172A' }),
      eyeShine: new THREE.MeshBasicMaterial({ color: '#FFFFFF' }),
      shadow: new THREE.MeshBasicMaterial({
        color: '#0F172A',
        transparent: true,
        opacity: 0.12 * opacity,
      }),
    };
  }, [opacity]);

  // Main 60fps Physics & Kinematics Loop
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033);
    const time = state.clock.elapsedTime;

    // Guard: Wait for first valid mouse coordinates before rendering puppet
    if (!isInitialized.current) {
      if (
        Number.isFinite(mouseWorld.x) &&
        Number.isFinite(mouseWorld.y) &&
        (mouseWorld.x !== 0 || mouseWorld.y !== 0)
      ) {
        anchorPos.current = { x: mouseWorld.x, y: mouseWorld.y };
        hipPos.current = { x: mouseWorld.x, y: mouseWorld.y - PUPPET_CONFIG.ropeLength };
        hipVel.current = { x: 0, y: 0 };
        isInitialized.current = true;
      } else {
        if (rootGroupRef.current) rootGroupRef.current.visible = false;
        return;
      }
    }
    if (rootGroupRef.current) rootGroupRef.current.visible = true;

    // 1. Safe Finite Anchor Follow (Mouse position)
    const rawMx = Number.isFinite(mouseWorld.x) ? mouseWorld.x : 0;
    const rawMy = Number.isFinite(mouseWorld.y) ? mouseWorld.y : 0;

    anchorPos.current.x = THREE.MathUtils.lerp(anchorPos.current.x, rawMx, PUPPET_CONFIG.anchorLerp);
    anchorPos.current.y = THREE.MathUtils.lerp(anchorPos.current.y, rawMy, PUPPET_CONFIG.anchorLerp);

    const ax = anchorPos.current.x;
    const ay = anchorPos.current.y;

    // 2. Target Rope Rest Length (Adaptive to states)
    let targetRope = PUPPET_CONFIG.ropeLength;
    if (actionState === 'INPUT_AVOID') targetRope = PUPPET_CONFIG.ropeLengthInputAvoid;
    else if (actionState === 'REACH') targetRope = PUPPET_CONFIG.ropeLengthReach;

    currentRopeLen.current = THREE.MathUtils.lerp(currentRopeLen.current, targetRope, 0.15);

    // 3. Stable Hanging Pendulum Physics (Critically damped, stays below mouse, NEVER orbits)
    const ropeLen = currentRopeLen.current;
    
    // Inertial lag offset based on mouse delta: gentle trailing behind movement
    const lagX = THREE.MathUtils.clamp(-mouseDelta.x * 4.0, -0.35, 0.35);
    const targetX = ax + lagX;
    const targetY = ay - ropeLen;

    // Spring force pulling hip towards target hanging position
    const diffX = targetX - hipPos.current.x;
    const diffY = targetY - hipPos.current.y;

    const springStrength = 36;
    const dampingStrength = 14; // Strong damping ensures no endless spinning or oscillation

    const springForceX = diffX * springStrength;
    const springForceY = diffY * springStrength;

    // Damping resisting velocity
    const dampForceX = -hipVel.current.x * dampingStrength;
    const dampForceY = -hipVel.current.y * dampingStrength;

    // Click Jump Reaction
    if (actionState === 'JUMP' && Math.abs(hipVel.current.y) < 1.0) {
      hipVel.current.y += PUPPET_CONFIG.jumpImpulse * 0.9;
    }

    // Integrate acceleration -> velocity -> position
    const accelX = springForceX + dampForceX;
    const accelY = springForceY + dampForceY;

    if (Number.isFinite(accelX)) hipVel.current.x += accelX * dt;
    if (Number.isFinite(accelY)) hipVel.current.y += accelY * dt;

    // Velocity clamp to prevent explosion
    const speed = Math.hypot(hipVel.current.x, hipVel.current.y);
    if (speed > 4.5) {
      hipVel.current.x = (hipVel.current.x / speed) * 4.5;
      hipVel.current.y = (hipVel.current.y / speed) * 4.5;
    }

    hipPos.current.x += hipVel.current.x * dt;
    hipPos.current.y += hipVel.current.y * dt;

    // CRITICAL: HARD CEILING CONSTRAINT (The puppet CANNOT swing above the anchor)
    // Hip must ALWAYS stay below anchor by at least 0.35 units
    if (hipPos.current.y > ay - 0.35) {
      hipPos.current.y = ay - 0.35;
      if (hipVel.current.y > 0) hipVel.current.y = -hipVel.current.y * 0.2;
    }

    // Side constraint: puppet cannot swing wider than 0.40 units horizontally from anchor
    const maxSideOffset = 0.40;
    if (Math.abs(hipPos.current.x - ax) > maxSideOffset) {
      hipPos.current.x = ax + Math.sign(hipPos.current.x - ax) * maxSideOffset;
      hipVel.current.x *= 0.3;
    }

    // Hard radius constraint (cannot stretch beyond 1.25x rope length)
    const currentDist = Math.hypot(ax - hipPos.current.x, ay - hipPos.current.y);
    const maxAllowedDist = ropeLen * 1.25;
    if (currentDist > maxAllowedDist) {
      const overDist = currentDist - maxAllowedDist;
      const nx = (ax - hipPos.current.x) / currentDist;
      const ny = (ay - hipPos.current.y) / currentDist;
      hipPos.current.x += nx * overDist;
      hipPos.current.y += ny * overDist;
      hipVel.current.x *= 0.5;
      hipVel.current.y *= 0.5;
    }

    // 4. Update Hip & Root Group
    if (hipGroupRef.current) {
      hipGroupRef.current.position.set(hipPos.current.x, hipPos.current.y, 0);

      // Pendulum tilt in Z (clamped to realistic ±35 degrees)
      const targetTiltZ = THREE.MathUtils.clamp(-hipVel.current.x * 0.20, -0.60, 0.60);
      smoothedHipTiltZ.current = THREE.MathUtils.lerp(smoothedHipTiltZ.current, targetTiltZ, 0.15);

      // 3D Yaw rotation in Y towards motion (±30 degrees)
      const targetYawY = THREE.MathUtils.clamp(hipVel.current.x * 0.35, -0.50, 0.50);
      smoothedYawY.current = THREE.MathUtils.lerp(smoothedYawY.current, targetYawY, 0.12);

      hipGroupRef.current.rotation.set(0, smoothedYawY.current, smoothedHipTiltZ.current);
    }

    // 5. Update Spine & Torso (Inertial lag)
    if (torsoRef.current) {
      let targetSpineZ = THREE.MathUtils.clamp(-accelX * 0.02, -0.30, 0.30);
      if (actionState === 'SCROLLING_DOWN') targetSpineZ += 0.20;
      else if (actionState === 'SCROLLING_UP') targetSpineZ -= 0.16;

      smoothedSpineZ.current = THREE.MathUtils.lerp(smoothedSpineZ.current, targetSpineZ, 0.2);
      torsoRef.current.rotation.z = smoothedSpineZ.current;
    }

    // 6. Update Head & Neck (Looks towards movement)
    if (headRef.current) {
      const lookAtZ = -smoothedSpineZ.current * 0.35;
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, lookAtZ, 0.2);
    }

    // 7. Leg Kinematics (Scroll Running Cycle vs Natural Pendulum Dangle)
    let targetLeftLeg = 0;
    let targetLeftKnee = -0.1;
    let targetRightLeg = 0;
    let targetRightKnee = -0.1;

    if (actionState === 'SCROLLING_DOWN' || actionState === 'SCROLLING_UP') {
      const dir = actionState === 'SCROLLING_DOWN' ? 1 : -1;
      const runSpeedMultiplier = Math.max(0.8, Math.min(3.5, Math.abs(scrollVelocity) * 1.5));
      runCyclePhase.current += dt * PUPPET_CONFIG.scrollRunSpeed * runSpeedMultiplier * dir;

      const stride = 0.80;
      targetLeftLeg = Math.sin(runCyclePhase.current) * stride;
      targetRightLeg = -Math.sin(runCyclePhase.current) * stride;

      // Knees bend sharply backward on back-stroke, straighten on kick
      targetLeftKnee = targetLeftLeg > 0 ? -targetLeftLeg * 0.95 : -0.1;
      targetRightKnee = targetRightLeg > 0 ? -targetRightLeg * 0.95 : -0.1;
    } else if (actionState === 'INPUT_AVOID') {
      // Tuck legs up to chest
      targetLeftLeg = 0.90;
      targetRightLeg = 0.90;
      targetLeftKnee = -1.15;
      targetRightKnee = -1.15;
    } else {
      // Natural idle breathing + pendulum lag behind movement
      const legLag = THREE.MathUtils.clamp(-hipVel.current.x * 0.30, -0.45, 0.45);
      const gentleBreathing = Math.sin(time * 2.2) * 0.05;

      targetLeftLeg = legLag + gentleBreathing;
      targetRightLeg = legLag - gentleBreathing;

      targetLeftKnee = Math.min(-0.05, -Math.abs(targetLeftLeg) * 0.6);
      targetRightKnee = Math.min(-0.05, -Math.abs(targetRightLeg) * 0.6);
    }

    curLeftLegAngle.current = THREE.MathUtils.lerp(curLeftLegAngle.current, targetLeftLeg, 0.25);
    curRightLegAngle.current = THREE.MathUtils.lerp(curRightLegAngle.current, targetRightLeg, 0.25);
    curLeftKneeAngle.current = THREE.MathUtils.lerp(curLeftKneeAngle.current, targetLeftKnee, 0.25);
    curRightKneeAngle.current = THREE.MathUtils.lerp(curRightKneeAngle.current, targetRightKnee, 0.25);

    if (leftHipRef.current) leftHipRef.current.rotation.z = curLeftLegAngle.current;
    if (rightHipRef.current) rightHipRef.current.rotation.z = curRightLegAngle.current;
    if (leftKneeRef.current) leftKneeRef.current.rotation.z = curLeftKneeAngle.current;
    if (rightKneeRef.current) rightKneeRef.current.rotation.z = curRightKneeAngle.current;

    // 8. Arm Kinematics (Wave, Reach, Run Pump, Idle Dangle)
    let targetLeftArm = 0.15;
    let targetLeftElbow = 0.25;
    let targetRightArm = -0.15;
    let targetRightElbow = 0.25;

    if (actionState === 'WAVE') {
      // Cute 1-hand wave
      targetRightArm = -2.1;
      targetRightElbow = 0.85 + Math.sin(time * 7.5) * 0.45;
      targetLeftArm = 0.2;
      targetLeftElbow = 0.2;
    } else if (actionState === 'REACH' && reachTarget) {
      // Lean and reach right hand towards clickable target
      const rdx = reachTarget.x - (hipPos.current.x + 0.18);
      const rdy = reachTarget.y - (hipPos.current.y + 0.22);
      const reachAngle = Math.atan2(rdy, rdx) - Math.PI / 2;

      targetRightArm = THREE.MathUtils.clamp(reachAngle, -2.6, 0.2);
      targetRightElbow = 0.15;
      targetLeftArm = 0.35;
      targetLeftElbow = 0.4;
    } else if (actionState === 'SCROLLING_DOWN' || actionState === 'SCROLLING_UP') {
      // Pump arms in sync with running legs
      targetLeftArm = -Math.sin(runCyclePhase.current) * 0.70;
      targetRightArm = Math.sin(runCyclePhase.current) * 0.70;
      targetLeftElbow = 0.55;
      targetRightElbow = 0.55;
    } else if (actionState === 'WORDMARK_DANCE') {
      // Joyful hip wiggle & arm swing
      targetLeftArm = Math.sin(time * 8) * 0.8;
      targetRightArm = -Math.sin(time * 8) * 0.8;
      targetLeftElbow = 0.6;
      targetRightElbow = 0.6;
    } else {
      // Inertial arm flop
      const armLag = THREE.MathUtils.clamp(-hipVel.current.x * 0.24, -0.45, 0.45);
      targetLeftArm = -armLag + 0.15 + Math.sin(time * 2.0) * 0.05;
      targetRightArm = armLag - 0.15 - Math.sin(time * 2.0) * 0.05;
      targetLeftElbow = Math.max(0.15, Math.abs(targetLeftArm) * 0.6);
      targetRightElbow = Math.max(0.15, Math.abs(targetRightArm) * 0.6);
    }

    curLeftArmAngle.current = THREE.MathUtils.lerp(curLeftArmAngle.current, targetLeftArm, 0.22);
    curRightArmAngle.current = THREE.MathUtils.lerp(curRightArmAngle.current, targetRightArm, 0.22);
    curLeftElbowAngle.current = THREE.MathUtils.lerp(curLeftElbowAngle.current, targetLeftElbow, 0.22);
    curRightElbowAngle.current = THREE.MathUtils.lerp(curRightElbowAngle.current, targetRightElbow, 0.22);

    if (leftShoulderRef.current) leftShoulderRef.current.rotation.z = curLeftArmAngle.current;
    if (rightShoulderRef.current) rightShoulderRef.current.rotation.z = curRightArmAngle.current;
    if (leftElbowRef.current) leftElbowRef.current.rotation.z = curLeftElbowAngle.current;
    if (rightElbowRef.current) rightElbowRef.current.rotation.z = curRightElbowAngle.current;

    // 9. Eye Blink Logic
    if (time > nextBlinkTime.current) {
      isBlinking.current = true;
      if (time > nextBlinkTime.current + 0.14) {
        isBlinking.current = false;
        nextBlinkTime.current = time + 2.5 + Math.random() * 3.0;
      }
    }
    const eyeScaleY = isBlinking.current ? 0.1 : 1.0;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    // 10. Update Rope Curve (Connecting Mouse to Hip Eyelet)
    if (ropeLineRef.current && ropeLineRef.current.geometry?.setPositions) {
      const eyeletX = hipPos.current.x;
      const eyeletY = hipPos.current.y + 0.10;

      // Defensive guard against non-finite values
      if (
        Number.isFinite(ax) &&
        Number.isFinite(ay) &&
        Number.isFinite(eyeletX) &&
        Number.isFinite(eyeletY)
      ) {
        const ropeDist = Math.hypot(ax - eyeletX, ay - eyeletY);
        const ropeSag = Math.min(0.25, Math.max(0.04, 0.16 - ropeDist * 0.10));

        const midX = (ax + eyeletX) / 2;
        const midY = (ay + eyeletY) / 2 - ropeSag;

        const flatCoords: number[] = [];
        for (let i = 0; i <= ROPE_SEGMENTS; i++) {
          const t = i / ROPE_SEGMENTS;
          const oneMinusT = 1 - t;
          const c0 = oneMinusT * oneMinusT;
          const c1 = 2 * oneMinusT * t;
          const c2 = t * t;

          const px = c0 * ax + c1 * midX + c2 * eyeletX;
          const py = c0 * ay + c1 * midY + c2 * eyeletY;

          flatCoords.push(px, py, 0);
        }

        if (flatCoords.length === (ROPE_SEGMENTS + 1) * 3 && !flatCoords.some((v) => !Number.isFinite(v))) {
          ropeLineRef.current.geometry.setPositions(flatCoords);
          try {
            ropeLineRef.current.geometry.computeBoundingSphere?.();
          } catch {}
        }
      }
    }

    // 11. Update Shadow Blob
    if (shadowRef.current) {
      shadowRef.current.position.set(hipPos.current.x, hipPos.current.y - 0.70, -0.05);
      const shadowScale = THREE.MathUtils.clamp(1.0 - (hipPos.current.y - (rawMy - 0.7)) * 0.25, 0.5, 1.4);
      shadowRef.current.scale.set(0.38 * shadowScale, 0.14 * shadowScale, 1);
    }
  });

  // Initial straight rope points
  const initialRopePoints = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= ROPE_SEGMENTS; i++) {
      const t = i / ROPE_SEGMENTS;
      pts.push([0, -0.70 * t, 0]);
    }
    return pts;
  }, []);

  return (
    <group ref={rootGroupRef}>
      {/* 1. Curved Hanging Rope connecting Cursor to Hip Eyelet */}
      <Line
        ref={ropeLineRef}
        points={initialRopePoints}
        color={PUPPET_CONFIG.colors.rope}
        lineWidth={2.0}
        transparent
        opacity={opacity * 0.85}
      />

      {/* 2. Soft Contact-less Radial Shadow Blob */}
      <mesh ref={shadowRef} position={[0, -0.70, -0.05]} material={materials.shadow}>
        <circleGeometry args={[1, 32]} />
      </mesh>

      {/* 3. The Articulated 3D Puppet Character (Proper ~105px Size, High Contrast & Vibrant) */}
      <group ref={hipGroupRef} position={[0, -0.70, 0]}>
        {/* HIP / PELVIS (THE ROPE ATTACHES HERE - Warm beechwood) */}
        <mesh material={materials.wood}>
          <sphereGeometry args={[0.11, 24, 24]} />
        </mesh>

        {/* Rope Attachment Metallic Eyelet Ring on Hip */}
        <mesh position={[0, 0.10, 0]} material={materials.ring}>
          <torusGeometry args={[0.028, 0.009, 14, 24]} />
        </mesh>

        {/* TORSO & UPPER BODY (Attached to Hip) */}
        <group ref={torsoRef} position={[0, 0.18, 0]}>
          {/* Royal Blue Shirt / Torso (Squashes on Jump) */}
          <mesh scale={[1, squash, 1]} material={materials.shirt}>
            <capsuleGeometry args={[0.11, 0.22, 16, 16]} />
          </mesh>

          {/* Crisp White Collar Trim (Ensures visibility even against blue backgrounds) */}
          <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.whiteTrim}>
            <torusGeometry args={[0.10, 0.02, 12, 24]} />
          </mesh>

          {/* Vivid Coral Red Scarf Ring */}
          <mesh position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.popScarf}>
            <torusGeometry args={[0.115, 0.032, 14, 24]} />
          </mesh>

          {/* NECK & HEAD GROUP (Attached to Torso) */}
          <group ref={headRef} position={[0, 0.30, 0]}>
            {/* Wooden Head Sphere */}
            <mesh material={materials.wood}>
              <sphereGeometry args={[0.14, 28, 28]} />
            </mesh>

            {/* Personality Cap (Vivid Red) */}
            <mesh
              position={[0, 0.09, 0]}
              rotation={[-0.1, 0, 0]}
              material={materials.popScarf}
            >
              <sphereGeometry args={[0.125, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>

            {/* Cap Visor Brim */}
            <mesh
              position={[0, 0.085, 0.09]}
              rotation={[0.22, 0, 0]}
              material={materials.popScarf}
            >
              <boxGeometry args={[0.13, 0.020, 0.07]} />
            </mesh>

            {/* Expressive Eyes with Blink animation */}
            <mesh ref={leftEyeRef} position={[-0.048, 0.02, 0.13]} material={materials.eyeWhite}>
              <sphereGeometry args={[0.022, 14, 14]} />
            </mesh>
            <mesh ref={rightEyeRef} position={[0.048, 0.02, 0.13]} material={materials.eyeWhite}>
              <sphereGeometry args={[0.022, 14, 14]} />
            </mesh>

            {/* Dark Pupils */}
            <mesh position={[-0.048, 0.02, 0.146]} material={materials.eyePupil}>
              <sphereGeometry args={[0.011, 12, 12]} />
            </mesh>
            <mesh position={[0.048, 0.02, 0.146]} material={materials.eyePupil}>
              <sphereGeometry args={[0.011, 12, 12]} />
            </mesh>

            {/* Cute Eye Highlights (Shine) */}
            <mesh position={[-0.044, 0.025, 0.152]} material={materials.eyeShine}>
              <sphereGeometry args={[0.0045, 8, 8]} />
            </mesh>
            <mesh position={[0.052, 0.025, 0.152]} material={materials.eyeShine}>
              <sphereGeometry args={[0.0045, 8, 8]} />
            </mesh>
          </group>

          {/* LEFT SHOULDER & ARM */}
          <group ref={leftShoulderRef} position={[-0.17, 0.14, 0]}>
            {/* Left Upper Arm (Royal Blue Shirt Sleeve) */}
            <mesh position={[0, -0.08, 0]} material={materials.shirt}>
              <capsuleGeometry args={[0.044, 0.14, 14, 14]} />
            </mesh>
            {/* Left Elbow Joint */}
            <group ref={leftElbowRef} position={[0, -0.16, 0]}>
              <mesh position={[0, -0.07, 0]} material={materials.wood}>
                <capsuleGeometry args={[0.038, 0.11, 14, 14]} />
              </mesh>
              {/* Hand Sphere */}
              <mesh position={[0, -0.14, 0]} material={materials.wood}>
                <sphereGeometry args={[0.042, 14, 14]} />
              </mesh>
            </group>
          </group>

          {/* RIGHT SHOULDER & ARM */}
          <group ref={rightShoulderRef} position={[0.17, 0.14, 0]}>
            {/* Right Upper Arm (Royal Blue Shirt Sleeve) */}
            <mesh position={[0, -0.08, 0]} material={materials.shirt}>
              <capsuleGeometry args={[0.044, 0.14, 14, 14]} />
            </mesh>
            {/* Right Elbow Joint */}
            <group ref={rightElbowRef} position={[0, -0.16, 0]}>
              <mesh position={[0, -0.07, 0]} material={materials.wood}>
                <capsuleGeometry args={[0.038, 0.11, 14, 14]} />
              </mesh>
              {/* Hand Sphere */}
              <mesh position={[0, -0.14, 0]} material={materials.wood}>
                <sphereGeometry args={[0.042, 14, 14]} />
              </mesh>
            </group>
          </group>
        </group>

        {/* LEFT HIP & LEG (Attached to Hip) */}
        <group ref={leftHipRef} position={[-0.09, -0.08, 0]}>
          {/* Left Thigh (Warm beechwood) */}
          <mesh position={[0, -0.09, 0]} material={materials.wood}>
            <capsuleGeometry args={[0.055, 0.16, 14, 14]} />
          </mesh>
          {/* Left Knee Joint */}
          <group ref={leftKneeRef} position={[0, -0.18, 0]}>
            <mesh position={[0, -0.08, 0]} material={materials.wood}>
              <capsuleGeometry args={[0.048, 0.13, 14, 14]} />
            </mesh>
            {/* Left Shoe Foot */}
            <mesh position={[0.018, -0.16, 0.03]} material={materials.shoes}>
              <boxGeometry args={[0.072, 0.046, 0.11]} />
            </mesh>
          </group>
        </group>

        {/* RIGHT HIP & LEG (Attached to Hip) */}
        <group ref={rightHipRef} position={[0.09, -0.08, 0]}>
          {/* Right Thigh (Warm beechwood) */}
          <mesh position={[0, -0.09, 0]} material={materials.wood}>
            <capsuleGeometry args={[0.055, 0.16, 14, 14]} />
          </mesh>
          {/* Right Knee Joint */}
          <group ref={rightKneeRef} position={[0, -0.18, 0]}>
            <mesh position={[0, -0.08, 0]} material={materials.wood}>
              <capsuleGeometry args={[0.048, 0.13, 14, 14]} />
            </mesh>
            {/* Right Shoe Foot */}
            <mesh position={[0.018, -0.16, 0.03]} material={materials.shoes}>
              <boxGeometry args={[0.072, 0.046, 0.11]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
