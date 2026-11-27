/**
 * @file puppetConfig.ts
 * Central configuration and tweakable parameters for the 3D Pulled Puppet Cursor.
 * 
 * Coordinate System:
 * Orthographic Camera zoom = 100.
 * 1 world unit = 100 CSS pixels.
 * Character height = ~1.0 world units (100px total).
 */

export interface PuppetConfig {
  // Visual scaling
  bodyScale: number;
  unitToPx: number;

  // Anchor & Rope Pull Physics
  ropeLength: number;
  ropeLengthReach: number;
  ropeLengthInputAvoid: number;
  ropeSpringStiffness: number;
  ropeSpringDamping: number;
  anchorLerp: number;
  maxSpeed: number; // clamp speed to prevent physics explosion

  // World Physics
  gravity: [number, number, number];
  linearDamping: number;
  angularDamping: number;
  airDrag: number;

  // Joint limits in radians (min, max)
  jointLimits: {
    hipX: [number, number];
    spineX: [number, number];
    neckX: [number, number];
    elbow: [number, number]; // One-way bend
    knee: [number, number];  // One-way bend
  };

  // State Machine parameters
  mousePulledThreshold: number; // px/frame to transition to PULLED
  idleDelayMs: number;          // ms to transition to WAVE
  scrollSmoothing: number;      // lerp factor for scroll velocity
  scrollRunStrength: number;    // motor strength for running cycle
  scrollRunSpeed: number;       // frequency multiplier for running cycle
  reachForce: number;           // impulse applied to hand toward hovered target
  jumpImpulse: number;          // upward impulse on click
  squashFactor: number;         // torso scale factor on click

  // Colors & Aesthetic (Theme Adaptive)
  colors: {
    wood: string;       // var(--ink) / deep slate toy wood
    shirt: string;      // var(--accent) / royal blue
    scarf: string;      // var(--pop) / rose red
    shoes: string;      // dark slate
    rope: string;       // rope color
    outline: string;    // cartoon outline color
  };
}

export const PUPPET_CONFIG: PuppetConfig = {
  // 1.0 unit = 100 CSS px
  bodyScale: 1.0,
  unitToPx: 100,

  // Rope
  ropeLength: 0.70,            // 70px rest distance from mouse to hip
  ropeLengthReach: 0.50,       // 50px when reaching toward clickable
  ropeLengthInputAvoid: 1.25,  // 125px away when over text inputs
  ropeSpringStiffness: 28.0,   // Stable spring pull
  ropeSpringDamping: 5.5,      // High damping to eliminate wild oscillations
  anchorLerp: 0.28,            // Responsive follow factor
  maxSpeed: 0.60,              // Max distance change per frame (world units)

  // Simulation
  gravity: [0, -4.5, 0],       // Stable downward gravity
  linearDamping: 0.92,         // Prevents endless swinging
  angularDamping: 0.95,        // Prevents spinning
  airDrag: 0.15,

  // Angular limits (radians)
  jointLimits: {
    hipX: [-0.35, 0.45],
    spineX: [-0.25, 0.35],
    neckX: [-0.25, 0.25],
    elbow: [0.0, 2.2],         // Forearm only bends forward
    knee: [-2.1, 0.0],         // Shin only bends backwards
  },

  // Dynamics & Transitions
  mousePulledThreshold: 0.02,  // world units per frame (~2px)
  idleDelayMs: 4000,           // 4s idle before wave
  scrollSmoothing: 0.10,       // Lerp factor for scroll velocity
  scrollRunStrength: 1.4,      // Strength of leg motor impulses
  scrollRunSpeed: 9.5,         // Speed of running cycle
  reachForce: 2.2,             // Pull hand toward button
  jumpImpulse: 2.5,            // Upward pop on mouse down
  squashFactor: 0.85,          // Visual squash on jump

  // Colors (Vibrant, high-contrast, visible on both light and dark backgrounds)
  colors: {
    wood: '#E8C498',           // Warm beech/birch mannequin wood
    shirt: '#2563EB',          // Royal Blue
    scarf: '#F43F5E',          // Vivid coral red cap & scarf
    shoes: '#0F172A',          // Dark slate shoes
    rope: '#0F172A',           // Dark, visible rope line
    outline: '#0F172A',        // High contrast outline
  },
};

/**
 * Check if debug query param is present (?puppet=debug)
 */
export function isPuppetDebug(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('puppet') === 'debug' || localStorage.getItem('puppet_debug') === 'true';
  } catch {
    return false;
  }
}
