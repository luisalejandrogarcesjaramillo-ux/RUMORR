# 🎬 RUMOR.RED – INICIO DE LA SIMULACIÓN

## ⏰ **Inicio Rápido (2 minutos)**

```bash
# Asegúrate de estar en la carpeta raíz del proyecto
# cd c:\Users\assi\Desktop\RUMORR

# Instala las dependencias (sincronizando con el Oráculo)
npm install

# Inicia el entorno de desarrollo (La Matrix en modo debug)
npm run dev
```

**Expected:** 3D model (TORO) with **cinematic lighting**, rotatable, "Contacto" button works.

---

## 📊 **Current Status**

| Phase | Status | What's Done |
|-------|--------|-----------|
| **H1** | ✅ COMPLETE | Clean architecture, ZERO tech debt, model loads |
| **H2** | 🚀 IN PROGRESS | Cinematographic lighting + HDRI + Contact Shadows |
| **H3-H8** | ⏳ Pending | Bloom, interactions, form, mobile, deploy |

---

## 🏗️ **Architecture (Clean & Ready)**

### Data Layer ✅
- **Types:** `src/types/index.ts` (Lead, InteractionEvent, APIResponse)
- **Config:** `src/config/index.ts` (UI_STRINGS, API_ENDPOINTS, THREE_D_CONFIG)

### Components ✅
| File | Purpose | H2 Status |
|------|---------|----------|
| `Scene.tsx` | Canvas + 3-light schema + HDRI | ✅ Updated |
| `EpicModel.tsx` | 3D model loading + hover support | ✅ Updated |
| `AutoGLB.tsx` | Auto-center/auto-scale component | ✨ New |
| `LeadModal.tsx` | Lead form (uses UI_STRINGS) | ✅ Ready |
| `pages/index.tsx` | Home page | ✅ Ready |
| `pages/api/leads.ts` | API validation + storage | ✅ Ready |

---

## 🚀 **H2: Cinematic Lighting** (In Progress)

### What's New
- ✨ **3-Light Schema:** Ambient + Key (directional) + Fill (accent)
- ✨ **Environment HDRI:** Realistic world lighting (`Environment preset="sunset"`)
- ✨ **Contact Shadows:** Object grounded in space
- ✨ **PCFSoftShadowMap:** Professional soft shadows

### How to Test
1. Open http://localhost:3000
2. Hard refresh: `Ctrl+Shift+R`
3. Observe:
   - [ ] Black background (not gradient)
   - [ ] Cinematic lighting on model
   - [ ] HDRI reflections visible
   - [ ] Contact shadows under model
   - [ ] FPS > 45

### Troubleshooting H2
- **Model invisible?** → See `H2_TRANSITION_GUIDE.md`
- **FPS dropping?** → Reduce `shadow-mapSize` or light intensities
- **Shadows not visible?** → Increase `ContactShadows opacity`

---

## 🎨 **Configuration (Centralized)**

All magic numbers live in `src/config/index.ts`:

```typescript
THREE_D_CONFIG: {
  CAMERA_Z_DESKTOP: 5,
  CAMERA_Z_MOBILE: 3,
  CAMERA_FOV: 50,
  AMBIENT_LIGHT_INTENSITY: 0.2,
  DIRECTIONAL_LIGHT_INTENSITY: 1.5,
  // ... more values
}
```

**No hardcoding.** Change one value → entire app responds.

---

## 🔍 **H1: Model Loading** (Complete ✅)
  rotation={[0, 0, 0]}     // ← Adjust if rotated
/>
```

### H1 Checklist
- [ ] `npm run dev` running?
- [ ] Model visible at http://localhost:3000?
- [ ] Rotatable with mouse?
- [ ] FPS > 50?
- [ ] "Contacto" button works?
- [ ] No console errors (F12)?

### If Model Needs Adjustment
Edit `components/EpicModel.tsx` and change `scale`, `position`, or `rotation`:
```tsx
// Too small? Increase scale
scale={[2, 2, 2]}

// De lado? Rotate 180°
rotation={[0, Math.PI, 0]}

// Floating? Move down
position={[0, -0.5, 0]}
```

---

## � **File Consistency** ✅

All imports corrected and validated:
- ✅ Components import from `../src/config` and `../src/types`
- ✅ Pages import from `../src/config` (or `../../src/types` from api/)
- ✅ API validates `Lead` type with email format check
- ✅ All UI strings centralized in config

---

## 🎯 **H1 Success Criteria** ✅

✅ Model visible and rotating
✅ FPS > 50
✅ Form works → lead saved
✅ No console errors
✅ Code is clean & ready for H2

**Time:** 45 min / 8-hour sprint

Ready? Commit and move to **H2: Responsive Lighting**! 🚀

2. **`METRICS_PROJECTION.md`** ← Understand the goal
   - Expected leads by Day 8: **80–140**
   - Growth projections (24h, 7d, 30d)
   - When to scale vs. pivot

3. **`README.md`** ← Technical reference
   - Stack overview
   - Deploy instructions
   - API endpoints

---

## 🚀 **Start H1 NOW (45 min)**

### **Step 1: Get Your 3D Model Ready**
- Find your `.glb` file (should be <2MB for fast load)
- Save it as `public/models/glb/TORO.glb`

### **Step 2: Update Scene.tsx**
- Edit `components/Scene.tsx`
- Replace `PlaceholderMesh()` with actual GLB loader:

```tsx
import { useGLTF } from '@react-three/drei'

function YourModel() {
  const gltf = useGLTF('/models/glb/TORO.glb')
  return <primitive object={gltf.scene} scale={[2, 2, 2]} />
}

export default function Scene() {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Lights />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <YourModel />
        </Suspense>
        <OrbitControls enablePan={false} autoRotate />
      </Canvas>
    </div>
  )
}
```

### **Step 3: Test**
- Reload `http://localhost:3000`
- Rotate with mouse → your model should spin
- No errors in console → proceed to H2

---

## 💡 **Pro Tips**

- **Stuck on GLB loading?** Check browser console for errors. Most common: file path wrong (case-sensitive on Linux).
- **Model too small?** Increase `scale=[2, 2, 2]` → `[5, 5, 5]`
- **Model upside down?** Add `rotation={[Math.PI / 2, 0, 0]}` to rotate 90°
- **Need quick GLB?** Use Spline.design export or poly.pizza
- **No GLB yet?** Use placeholder for now, come back at H6 (optimization phase)

---

## 🎯 **Your Checklist Right Now**

- [ ] `npm run dev` running
- [ ] http://localhost:3000 loads
- [ ] Scene renders (no errors)
- [ ] GLB model saved to `/public/models/glb/`
- [ ] Scene.tsx updated with your model path
- [ ] Model visible in browser
- [ ] Model rotates smoothly (FPS > 50)

**When all ✅ → Move to H2 (lighting + atmosphere)**

---

## ❓ **Questions?**

- **Stuck?** Check SPRINT_CHECKLIST.md for that hour's checklist
- **Errors?** Open DevTools (F12) → Console → paste error here
- **Performance bad?** Run Lighthouse (DevTools → Lighthouse) → check opportunities

---

**Let's go! ⏱️ Your 8-hour timer starts NOW.**

👉 Next: Read `SPRINT_CHECKLIST.md`, grab your GLB file, update Scene.tsx. Target: H1 done in 45 min.
