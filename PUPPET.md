# 3D "Pulled Puppet" Physics Cursor Guide

## 🎭 Overview
The **Pulled Puppet Cursor** is a dynamic, physics-driven layer rendered on a transparent, full-viewport React Three Fiber (`@react-three/fiber`) canvas backed by Rapier 3D physics (`@react-three/rapier`).
The existing precise cursor dot and ring remain the primary mouse pointer; the puppet is an articulated, stylized wooden mannequin character suspended from an invisible rope attached to his **hip**, trailing the cursor with realistic inertia, gravity, and momentum.

---

## 🏗️ Architecture & Coordinates

- **Canvas Placement**: Mounted via [components/shared/ClientShell.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/shared/ClientShell.tsx) inside `app/layout.tsx`.
- **Z-Index Layer**: `z-[45]` (above normal content at `z-10` / `z-20`, but below modals, command palette, and interactive overlays at `z-[60]`+).
- **Coordinate Space**: Orthographic camera with `zoom = 100`, where **1 world unit = 100 CSS pixels**.
  - Mouse `(clientX, clientY)` maps to world:
    - `worldX = (clientX - window.innerWidth / 2) / 100`
    - `worldY = -(clientY - window.innerHeight / 2) / 100`
  - Total figure height: ~1.0 world units (100px total).

---

## ⚙️ The State Machine (`components/cursor/usePuppetState.ts`)

| State | Trigger | Behavior |
| :--- | :--- | :--- |
| **`IDLE_DANGLE`** | Mouse stationary, page not scrolling | Hangs vertically from the hip rope with gentle air drag and damping. |
| **`PULLED`** | Mouse velocity > `0.02` units/frame | Hip pulls forward; torso and limbs trail behind; body subtly rotates around Y toward movement direction (up to ±25°). |
| **`SCROLLING_DOWN`** | Scroll velocity > `0.02` (page moving down) | Sine wave motors drive alternating hips, knees, and arms in a running cycle; torso leans forward. |
| **`SCROLLING_UP`** | Scroll velocity < `-0.02` (page moving up) | Running cycle in reverse; torso leans backward to simulate climbing. |
| **`REACH`** | Hovering `<a>`, `<button>`, `[data-cursor]` | Rope shortens to 35px; right arm reaches out toward the center of the hovered element. |
| **`JUMP`** | Mouse click / mousedown | Instant upward vertical impulse on hip (`+2.8`); torso squashes to 0.85 scale. |
| **`WAVE`** | Mouse idle > 4.0s without scrolling | Right forearm waves in a friendly greeting cycle. Resumes instantly on mouse movement. |
| **`INPUT_AVOID`** | Hovering `<input>`, `<textarea>`, editable text | Puppet fades to `25%` opacity; rope lengthens to 115px to keep clear of text caret. |
| **`WORDMARK_DANCE`** | Hovering footer `DHANUSH A` wordmark | Playful hip wiggle across the wordmark. |

---

## 🎛️ How to Tune the Feel (`lib/puppetConfig.ts`)

All parameters are centralized in [lib/puppetConfig.ts](file:///c:/Users/adhan/dhanush-portfolio-v2/lib/puppetConfig.ts):

```typescript
export const PUPPET_CONFIG = {
  ropeLength: 0.52,            // 52px rest distance from cursor to hip
  ropeLengthReach: 0.35,       // Shortened rope when reaching for buttons
  ropeLengthInputAvoid: 1.15,  // Extended distance when over text inputs
  ropeSpringStiffness: 42.0,   // Responsiveness of the pull
  ropeSpringDamping: 3.8,      // Damping to eliminate spring oscillation
  anchorLerp: 0.22,            // Inertial follow smoothing (lower = heavier trail)
  maxSpeed: 0.55,              // Safety clamp to prevent physics explosion on flicks
  gravity: [0, -3.2, 0],       // ~32% standard gravity for buoyant floating
  linearDamping: 0.85,         // Air resistance against endless swinging
  angularDamping: 0.95,        // Prevents endless spinning
  scrollRunSpeed: 8.5,         // Frequency of leg cycles when scrolling
  scrollRunStrength: 1.4,      // Leg motor torque amplitude
  reachForce: 2.2,             // Arm reach pull strength
  jumpImpulse: 2.8,            // Upward pop on mouse click
};
```

### Interactive Debug Mode
Add `?puppet=debug` to your URL (e.g., `http://localhost:3000/?puppet=debug`):
- Displays Rapier 3D collider wireframes.
- Surfaces a live slider control panel in the bottom-left corner to test rope length, gravity, and spring stiffness in real time.

---

## 🎨 How to Swap Colors & Shapes

Colors are defined in `PUPPET_CONFIG.colors` in `lib/puppetConfig.ts`:
- **Torso / Shirt**: `colors.shirt` (defaults to `#2563EB` Royal Blue).
- **Limbs / Head**: `colors.wood` (defaults to `#1E293B` Deep Toy Wood).
- **Scarf & Cap**: `colors.scarf` (defaults to `#F43F5E` Rose Red).
- **Shoes**: `colors.shoes` (defaults to `#0F172A`).
- **Outlines**: `colors.outline` via Drei `<Outlines thickness={0.015} />`.

To change body proportions or shapes, edit [components/cursor/PuppetBody.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/cursor/PuppetBody.tsx). Each rigid body uses standard Three.js geometries (`capsuleGeometry`, `sphereGeometry`, `boxGeometry`) wrapped with matching Rapier colliders.

---

## 📱 Mobile & Accessibility Fallbacks

1. **Touch Devices**:
   - For `matchMedia('(pointer: coarse)')`, the heavy 3D physics engine is not loaded.
   - Instead, a lightweight CSS/Framer Motion mascot ([components/cursor/MobileMascot.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/cursor/MobileMascot.tsx)) docks in the bottom-right corner. It runs when scrolling and jumps on tap, with a dismiss (`×`) button saved to `localStorage`.
2. **Reduced Motion**:
   - If `prefers-reduced-motion: reduce` is enabled, the 3D puppet and mascot are completely disabled.
3. **User Toggle**:
   - Press <kbd>P</kbd> at any time to toggle the puppet ON/OFF.
   - Click the **Puppet: ON / OFF (P)** badge in the footer hint row.
   - Saved in `localStorage` under `puppet_cursor_enabled`.
