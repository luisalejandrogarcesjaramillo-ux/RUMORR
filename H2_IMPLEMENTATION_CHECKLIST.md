# 🚀 H1→H2 Implementation Checklist

## Overview
- **Current State:** H1 architecture complete, server running, model loads
- **Target State:** H2 cinematographic lighting with professional 3-light schema + HDRI + Contact Shadows
- **Time Budget:** 45 minutes
- **Success Metric:** FPS > 45, model rendered with cinematic lighting, no console errors

---

## ✅ Phase 1: Verify Current State (5 min)

- [ ] Terminal: `npm run dev` is running
  - Expected output: `✓ Ready in 2.4s`
  - Expected URL: `http://localhost:3000`

- [ ] Browser: Open http://localhost:3000
  - [ ] Model TORO.glb visible?
  - [ ] Can rotate with mouse?
  - [ ] No red errors in F12 Console?

- [ ] Performance baseline: F12 → DevTools
  - [ ] Check FPS (should be > 40 currently)
  - Note current FPS for H2 comparison

---

## ✅ Phase 2: Code Files Ready (Auto-Complete ✅)

These files have been **automatically created/updated** for you:

- ✅ **`components/AutoGLB.tsx`**
  - ✓ Auto-centers any .glb
  - ✓ Auto-scales to fit viewport
  - ✓ Optional auto-rotation
  - **Status:** Ready to use (optional upgrade)

- ✅ **`components/EpicModel.tsx`** (Updated)
  - ✓ Added hover glow support (`onPointerEnter`/`onPointerLeave`)
  - ✓ Added `onHover` callback
  - **Status:** H4-ready, works as-is for H2

- ✅ **`components/Scene.tsx`** (Updated for H2)
  - ✓ 3-light schema (ambient, key, fill)
  - ✓ Environment HDRI support (`<Environment />`)
  - ✓ Contact Shadows for grounding
  - ✓ PCFSoftShadowMap for soft shadows
  - **Status:** Ready for browser refresh

---

## ✅ Phase 3: Test H2 Lighting (5 min)

### Step 1: Hard Refresh Browser
- Press: **Ctrl+Shift+R** (Windows)
- Expected: Browser reloads, Scene.tsx H2 code is loaded

### Step 2: Observe Immediate Changes
- [ ] Background changed from gradient to **solid BLACK**
  - ✓ Cleaner, more professional
  
- [ ] Model now has **cinematic lighting**
  - ✓ Visible HDRI reflections on model surface
  - ✓ Strong directional shadow
  - ✓ Subtle fill light (bluish accent)
  
- [ ] **Contact Shadows** visible under model
  - ✓ Model looks "grounded" in space
  - ✓ Not floating disconnected

### Step 3: Performance Check
- [ ] Open F12 → Performance Tab
- [ ] FPS Stable? (should be 45-60)
  - If FPS drops below 40: See **Troubleshooting** section
  - If FPS stable: ✅ Continue

### Step 4: Rotate the Model
- [ ] Use mouse to rotate model
- [ ] Lighting should move realistically with model
- [ ] Shadows should cast smoothly
- [ ] No stuttering or lag

---

## ✅ Phase 4: Adjust Lighting to Taste (10 min)

### Option A: Try Different HDRI Presets

Edit `components/Scene.tsx`, line ~55:

```tsx
<Environment preset="sunset" background={false} />
```

Replace `"sunset"` with any of these:

```
"city"       → Urban, cool tones, tech vibe
"dawn"       → Soft, hopeful, morning glow
"forest"     → Natural, organic, earthy
"studio"     → Neutral, clean, professional
"night"      → Dark, cinematic, dramatic
"warehouse"  → Raw, industrial, stark
"park"       → Bright, outdoor, community
```

**Test:** Ctrl+S (save), browser hot-reloads. Watch lighting change immediately.

### Option B: Adjust Light Intensities

If lighting feels too bright/dark:

```tsx
// In Scene.tsx, Lights function:

<ambientLight intensity={0.2} />  // Adjust: 0.1 (dark) to 0.5 (bright)
<directionalLight intensity={1.5} /> // Adjust: 1.0 (soft) to 2.0 (dramatic)
<pointLight intensity={0.5} /> // Adjust: 0.2 (subtle) to 1.0 (strong)
```

### Option C: Adjust Contact Shadows

```tsx
<ContactShadows
  position={[0, -1, 0]}
  opacity={0.5}        // ← 0.2 (subtle) to 0.9 (strong)
  scale={10}           // ← 5 (small) to 15 (large)
  blur={2}             // ← 1 (sharp) to 4 (soft)
/>
```

---

## ✅ Phase 5: Verify Model Scale & Position (10 min)

### Current State
- Model uses EpicModel (manual scale/position/rotation)
- Scale: `[1, 1, 1]` (can adjust if too big/small)
- Position: `[0, 0, 0]` (center)
- Rotation: `[0, 0, 0]` (no rotation)

### If Model Looks Too Big
Edit `components/Scene.tsx`, line ~74:

```tsx
<EpicModel
  modelUrl="/models/glb/TORO.glb"
  scale={[0.5, 0.5, 0.5]}  // ← Reduce from 1 to 0.5
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
/>
```

Save, observe immediately.

### If Model Looks Too Small
```tsx
scale={[2, 2, 2]}  // ← Increase from 1 to 2
```

### If Model Looks "Floating"
```tsx
position={[0, -0.5, 0]}  // ← Move down by 0.5 units
```

### Optional: Use AutoGLB (Advanced)
If you want automatic centering/scaling, replace EpicModel with:

```tsx
import { AutoGLB } from './AutoGLB'

<Suspense fallback={null}>
  <AutoGLB url="/models/glb/TORO.glb" rotateSpeed={0.3} castShadow={true} />
</Suspense>
```

AutoGLB handles all centering/scaling automatically. **No manual tweaking needed.**

---

## ✅ Phase 6: Final Quality Checks (5 min)

### Rendering Quality
- [ ] Model renders smoothly?
- [ ] Lighting looks professional (not flat, not over-exposed)?
- [ ] Shadows are soft and realistic?
- [ ] HDRI reflections visible on model?

### Performance
- [ ] FPS > 45 consistently?
- [ ] No stuttering when rotating?
- [ ] No memory leaks (F12 → Memory tab)?

### UX
- [ ] Model rotates smoothly with mouse?
- [ ] Zoom works (scroll wheel)?
- [ ] No console errors (F12)?

---

## ✅ Phase 7: Commit Progress (5 min)

Once H2 looks good:

```powershell
cd c:\Users\assi\Desktop\RUMORR

git add components/Scene.tsx components/EpicModel.tsx components/AutoGLB.tsx

git commit -m "H2: Cinematic lighting + HDRI + Contact Shadows

- Implemented 3-light schema (ambient, key, fill)
- Added Environment HDRI preset (sunset)
- Added ContactShadows for grounding effect
- Upgraded EpicModel with hover glow support
- Created AutoGLB for auto-center/auto-scale
- Performance: FPS > 45, cinematic look achieved"

git log --oneline -5  # Verify commit
```

---

## 🆘 Troubleshooting H2

### Issue: Model Invisible After Refresh
**Solution:**
1. Check browser console (F12) for errors
2. Verify file path: `/models/glb/TORO.glb` exists
3. Restart server: `Ctrl+C`, `npm run dev`
4. Hard refresh: `Ctrl+Shift+R`

### Issue: FPS Below 40
**Solution (Pick One):**
1. Reduce shadow resolution:
   ```tsx
   shadow-mapSize-width={1024}   // Was 2048
   shadow-mapSize-height={1024}  // Was 2048
   ```

2. Reduce light intensities:
   ```tsx
   <ambientLight intensity={0.15} />       // Was 0.2
   <directionalLight intensity={1.0} />    // Was 1.5
   ```

3. Disable Contact Shadows temporarily:
   ```tsx
   {/* <ContactShadows ... /> */}  // Comment out
   ```

### Issue: Model Looks Flat (No 3D Feel)
**Solution:**
1. Verify `<Environment />` is rendering: model should have reflections
2. Try different HDRI preset: `<Environment preset="studio" />`
3. Increase directional light intensity: `intensity={2.0}`

### Issue: Shadows Not Visible
**Solution:**
1. Verify `castShadow` on directionalLight:
   ```tsx
   <directionalLight castShadow ... />
   ```

2. Verify `ContactShadows` Y position:
   ```tsx
   <ContactShadows position={[0, -1, 0]} />  // Below model
   ```

3. Increase opacity:
   ```tsx
   <ContactShadows opacity={0.8} />
   ```

---

## 📊 H2 Success Criteria (All Must ✅)

Before moving to H3, verify:

- ✅ Model renders with **cinematic 3-light schema**
- ✅ HDRI **environment visible** (not just black background)
- ✅ **Contact Shadows** ground the object
- ✅ FPS > 45 on desktop
- ✅ Model rotates **smoothly** with mouse
- ✅ **No console errors** (F12)
- ✅ Lighting matches professional standards

---

## 🎬 H2 Complete! Next: H3 (Bloom Effect)

Once H2 passes all checks:

1. Update `DAILY_LOG.md`:
   ```
   ## H2: Cinematic Lighting (0:45–1:30) ✅ COMPLETE
   - Environment preset: sunset
   - 3-light schema active
   - Contact Shadows grounding effect
   - FPS: 50+ stable
   - Next: H3 (Bloom effect)
   ```

2. Read: `H3_BLOOM_GUIDE.md` (coming next)

---

**Status: Ready for browser testing! 🚀**

Open http://localhost:3000 and see the magic happen!
