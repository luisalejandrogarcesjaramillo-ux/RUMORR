# H2 Transition Guide: Iluminación Cinematográfica

## 🎬 What You've Achieved (H1 ✅)

- ✅ Clean architecture (4 pillars)
- ✅ Data contracts + Centralized config
- ✅ API validation + Lead capture
- ✅ EpicModel component ready
- ✅ Server running, http://localhost:3000 accessible

---

## 🌟 What's New in H2 (Professional 3D Upgrade)

### **New Components Created**

#### 1. **AutoGLB.tsx** (Auto-Center, Auto-Scale)

- **Location:** `components/AutoGLB.tsx`
- **Purpose:** Automatically centers any `.glb` file, scales it proportionally, optionally rotates it
- **No more manual tweaking:** The component handles bounding box calculation and centering
- **Features:**
  - Auto-centers pivot point (no more floating objects)
  - Uniform scaling to fit [-1,1] bounding box
  - Optional auto-rotation (`rotateSpeed` parameter)
  - Shadow support (`castShadow` boolean)
  - Preloads model for faster rendering

**Usage in Scene.tsx:**
```tsx
import { AutoGLB } from './AutoGLB'

<Suspense fallback={null}>
  <AutoGLB url="/models/glb/ENSAYO1.glb" rotateSpeed={0.3} />
</Suspense>
```

---

#### 2. **Scene.tsx (H2 Update)** — Cinematic Lighting

**Location:** `components/Scene.tsx`

**Major Changes:**

1. **3-Light Schema (Professional Cinema Standard)**
   - **Ambient Light (intensity 0.2):** Base illumination, prevents pure blacks
   - **Key Light / Directional (intensity 1.5):** Main sun-like light, creates primary shadows
   - **Fill Light / Point (intensity 0.5, blue #4f46e5):** Accent light from opposite direction, adds depth

2. **Environment HDRI (The Magic Line)**
   ```tsx
   <Environment preset="sunset" background={false} />
   ```
   - Replaces flat gradients with realistic world lighting
   - Reflects light onto your model like it's in a real world
   - Try other presets: `"city"`, `"dawn"`, `"forest"`, `"studio"`

3. **Contact Shadows**
   ```tsx
   <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={10} />
   ```
   - Adds soft shadows under the model
   - Grounds the object in space, gives it weight
   - Makes it feel less "floating"

4. **PCFSoftShadowMap Quality**
   ```tsx
   shadows={{ type: 'PCFSoftShadowMap' }}
   ```
   - Soft, realistic shadows (not harsh/pixelated)
   - Professional 3D look

---

## 📋 H2 Implementation Checklist

### **Step 1: Verify Server is Running**
- [ ] Open terminal
- [ ] Run: `npm run dev`
- [ ] Expected: `✓ Ready in 2.4s` and `Compiled in ...ms`
- [ ] Browser: http://localhost:3000 (F12 → Console should show no errors)

### **Step 2: Test Current Model Loading**
- [ ] Open http://localhost:3000
- [ ] Do you see ENSAYO1.glb rendered?
- [ ] Can you rotate it with the mouse?
- [ ] F12 → Performance: FPS > 45?
  - If NO → Reduce light intensity or shadow resolution

### **Step 3: Optional — Use AutoGLB for Better Auto-Scaling**

If your model needs better centering/scaling, replace EpicModel usage:

**Current (Basic):**
```tsx
<EpicModel
  modelUrl="/models/glb/ENSAYO1.glb"
  scale={[1, 1, 1]}
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
/>
```

**New (Professional Auto-Scaling):**
```tsx
<AutoGLB
  url="/models/glb/ENSAYO1.glb"
  rotateSpeed={0.3}  // rad/s, or 0 to disable
  castShadow={true}
/>
```

**Note:** If you use AutoGLB, remove manual position/rotation/scale — the component handles it.

### **Step 4: Verify Cinematic Lighting in Scene.tsx**

- [ ] Background is now BLACK (not gradient) — cleaner, more professional
- [ ] HDRI environment visible (model has realistic reflections)
- [ ] 3-light schema active:
  - Ambient: subtle base light
  - Key: strong shadow-casting directional
  - Fill: accent point light
- [ ] Contact shadows visible under model

### **Step 5: Adjust Lighting to Your Taste**

In `Scene.tsx`, experiment with:

```tsx
// Try different HDRI presets
<Environment preset="sunset" background={false} />
// Options: "city", "dawn", "forest", "studio", "sunset", "night", "warehouse", "park"

// Adjust light intensities
<directionalLight intensity={1.5} /> // 1-2 for cinematic feel
<pointLight intensity={0.5} /> // Fill light strength

// Adjust contact shadow strength
<ContactShadows opacity={0.5} /> // 0.2-0.8 for subtlety
```

### **Step 6: Performance Check**

- [ ] FPS stable > 45 on desktop?
- [ ] Model renders smoothly?
- [ ] No console errors (F12)?

---

## 🎨 Environment Preset Guide

| Preset | Vibe | Best For |
|--------|------|----------|
| `"sunset"` | Warm, dramatic | Fashion, luxury, drama |
| `"city"` | Urban, cool | Tech, modern, sleek |
| `"dawn"` | Soft, hopeful | Wellness, morning, fresh |
| `"forest"` | Natural, organic | Sustainability, nature |
| `"studio"` | Neutral, clean | Product shots, professional |
| `"night"` | Dark, cinematic | Mystery, gaming, sci-fi |
| `"warehouse"` | Raw, industrial | Tech, minimal, stark |
| `"park"` | Bright, outdoor | Family, outdoor, community |

---

## 🚀 Next Steps (H3+)

- **H3:** Add Bloom effect for cinematic glow
- **H4:** Add hover glow + click animations
- **H5:** Responsive narrative UI
- **H6:** Lead capture validation
- **H7:** Mobile optimization
- **H8:** Deploy to Vercel

---

## 🆘 Troubleshooting H2

### **Problem: Model Invisible**
- **Check:** Is scale correct? Try `scale={[0.5, 0.5, 0.5]}` or `scale={[2, 2, 2]}`
- **Check:** Is it behind the camera? Try `position={[0, -1, 0]}` to move down

### **Problem: FPS Drops Below 45**
- Lower `shadow-mapSize` in directionalLight (2048 → 1024)
- Reduce pointLight intensity (0.5 → 0.2)
- Disable `castShadow` on fillLight

### **Problem: Model Looks Flat**
- The 3-light setup should fix this
- Try different HDRI presets (sunset vs. studio)
- Increase directional light intensity (1.5 → 2.0)

### **Problem: Contact Shadows Not Visible**
- Increase opacity: `opacity={0.5}` → `opacity={0.8}`
- Adjust position: `position={[0, -1, 0]}` (Y should be below model)

---

## 📊 H2 Success Criteria

- ✅ Model renders with professional lighting
- ✅ HDRI environment visible (realistic reflections)
- ✅ Contact shadows ground the object
- ✅ FPS > 45 on desktop
- ✅ Model can be rotated smoothly
- ✅ No console errors

**Once H2 is complete → Move to H3: Bloom Effect + Post-Processing**

---

## 📝 Configuration Reference

All lighting values are **not hardcoded** — they live in `src/config/index.ts`:

```typescript
THREE_D_CONFIG: {
  CAMERA_Z_DESKTOP: 5,
  CAMERA_Z_MOBILE: 3,
  CAMERA_FOV: 50,
  AMBIENT_LIGHT_INTENSITY: 0.2, // ← Update here
  DIRECTIONAL_LIGHT_INTENSITY: 1.5, // ← Or here
  // ... more config
}
```

If you want to tweak values globally, edit `src/config/index.ts` instead of Scene.tsx.

---

## 🎬 Example: Full H2 Scene Setup

```tsx
// components/Scene.tsx (H2 Complete)

import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AutoGLB } from './AutoGLB'  // New component
import { THREE_D_CONFIG } from '../src/config'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4f46e5" />
    </>
  )
}

export default function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows={{ type: 'PCFSoftShadowMap' }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Lights />
        
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
        </Suspense>
        
        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={10} />
        
        <Suspense fallback={null}>
          <AutoGLB url="/models/glb/ENSAYO1.glb" rotateSpeed={0.3} castShadow={true} />
        </Suspense>
        
        <OrbitControls enablePan={false} enableZoom enableRotate />
      </Canvas>
    </div>
  )
}
```

---

**Ready? Open http://localhost:3000 and tell me what you see! 🚀**
