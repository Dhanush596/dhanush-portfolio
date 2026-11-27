'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TouchSensorSceneProps {
  mode?: 'fluid' | 'wireframe';
}

// Custom Vertex Shader with Touch & Velocity Wave Deformation
const vertexShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_prev_mouse;
  uniform float u_velocity;
  uniform float u_mode;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Classic Simplex 2D Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Ambient subtle organic rolling wave
    float ambientNoise = snoise(pos.xy * 0.45 + u_time * 0.12) * 0.22;
    ambientNoise += snoise(pos.xy * 0.9 - u_time * 0.08) * 0.11;

    // Distance from current pointer/touch
    float dist = distance(pos.xy, u_mouse * vec2(8.0, 5.0));
    
    // Wave ripple pulse influenced by velocity and touch
    float touchRadius = 3.2;
    float touchInfluence = smoothstep(touchRadius, 0.0, dist);
    float ripple = sin(dist * 7.0 - u_time * 4.0) * touchInfluence * (0.35 + u_velocity * 0.8);

    // Total displacement
    float elevation = ambientNoise + ripple;
    pos.z += elevation;

    vElevation = elevation;
    vNormal = normalize(normalMatrix * normal);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment Shader tailored for Bright Light Theme with soft pastel wave & indigo lines
const fragmentShader = `
  uniform float u_time;
  uniform float u_mode;
  uniform vec2 u_mouse;
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // Normal & view vector for Fresnel reflection
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel effect
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

    // Specular highlight
    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
    vec3 halfVector = normalize(lightDir + viewDir);
    float NdotH = max(dot(normal, halfVector), 0.0);
    float specular = pow(NdotH, 18.0);

    // Palette: #BFDBFE, #DDD6FE, #FFFFFF with highlights in #2563EB
    vec3 colorSky = vec3(0.749, 0.859, 0.996);     // #BFDBFE
    vec3 colorLavender = vec3(0.867, 0.839, 0.996); // #DDD6FE
    vec3 colorWhite = vec3(1.0, 1.0, 1.0);
    vec3 colorIndigo = vec3(0.145, 0.388, 0.922);  // #2563EB

    // Mode 1: Wireframe Mode (Indigo lines on transparent)
    if (u_mode > 0.5) {
      vec2 grid = abs(fract(vUv * 36.0 - 0.5) - 0.5) / fwidth(vUv * 36.0);
      float line = min(grid.x, grid.y);
      float gridLine = 1.0 - min(line, 1.0);
      float alpha = gridLine * 0.28 + fresnel * 0.15;
      gl_FragColor = vec4(colorIndigo, alpha);
      return;
    }

    // Mode 0: Soft Pastel Gradient Wave
    float mixFactor = clamp((vElevation + 0.25) * 1.6, 0.0, 1.0);
    vec3 pastelBase = mix(colorSky, colorLavender, vUv.x);
    pastelBase = mix(pastelBase, colorWhite, mixFactor * 0.65);

    vec3 finalColor = pastelBase;
    finalColor = mix(finalColor, colorIndigo, specular * 0.22 + fresnel * 0.12);

    gl_FragColor = vec4(finalColor, 0.72 + mixFactor * 0.2);
  }
`;

export function TouchSensorScene({ mode = 'fluid' }: TouchSensorSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const prevMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<number>(0);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_prev_mouse: { value: new THREE.Vector2(0, 0) },
      u_velocity: { value: 0 },
      u_mode: { value: mode === 'wireframe' ? 1.0 : 0.0 },
    }),
    [mode]
  );

  useEffect(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.u_mode.value = mode === 'wireframe' ? 1.0 : 0.0;
        mat.wireframe = mode === 'wireframe';
      }
    }
  }, [mode]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value += delta;

    // Track mouse coordinates normalized (-1 to 1)
    const currentX = state.pointer.x;
    const currentY = state.pointer.y;

    // Compute pointer velocity
    const dx = currentX - prevMouse.current.x;
    const dy = currentY - prevMouse.current.y;
    const currentSpeed = Math.sqrt(dx * dx + dy * dy) / Math.max(delta, 0.001);

    velocity.current = THREE.MathUtils.lerp(
      velocity.current,
      Math.min(currentSpeed * 0.1, 1.5),
      delta * 5.0
    );

    // Smooth pointer lerp
    mat.uniforms.u_mouse.value.x = THREE.MathUtils.lerp(
      mat.uniforms.u_mouse.value.x,
      currentX,
      delta * 4.0
    );
    mat.uniforms.u_mouse.value.y = THREE.MathUtils.lerp(
      mat.uniforms.u_mouse.value.y,
      currentY,
      delta * 4.0
    );

    mat.uniforms.u_velocity.value = velocity.current;

    prevMouse.current.x = currentX;
    prevMouse.current.y = currentY;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-0.2, 0, 0]}>
      {/* Optimized plane geometry for fluid wave dynamics */}
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 36, 36]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={mode === 'wireframe'}
        transparent
      />
    </mesh>
  );
}
