# 🎬 H2 Quick Test & Visual Verification

**Duration:** 10 minutes  
**Goal:** Verify cinematographic lighting is working correctly  
**Success Criteria:** FPS > 45, cinematic look achieved, no errors

---

## 🚀 Step 1: Hard Refresh Browser (1 min)

```
Current URL: http://localhost:3000

Action:
1. Press: Ctrl+Shift+R (Hard refresh)
2. Wait for page to load (should be < 3 seconds)
3. Do NOT see any red errors in F12 Console
```

**Expected Behavior:**
- Page loads with ENSAYO1 model visible
- Background is **BLACK** (not gradient anymore)
- Model has **cinematic lighting** (not flat)

---

## 🎨 Step 2: Visual Inspection (3 min)

### Check 1: Background
```
❓ Is the background BLACK instead of the purple gradient?
✅ YES  → Good, H2 is active
❌ NO   → Try hard refresh again (Ctrl+Shift+R)
```

### Check 2: Lighting Quality
```
❓ Does the model have realistic lighting and shadows?
✅ YES (you see reflections, shadows, 3D feel) → H2 working
❌ NO (looks flat, plain) → Check console errors (F12)
```

### Check 3: Contact Shadows
```
❓ Do you see soft shadows under the model?
✅ YES (subtle shadow on ground plane) → H2 perfect
❌ NO (no shadows) → Increase ContactShadows opacity in Scene.tsx
```

### Check 4: HDRI Environment
```
❓ Does the model have realistic reflections/highlights?
✅ YES (golden/warm tones from HDRI) → HDRI working
❌ NO (object looks dull) → Try different preset: "city" or "studio"
```

---

## ⚡ Step 3: Performance Check (2 min)

### Open DevTools Performance Tab
```
Press: F12 (open DevTools)
Tab: Performance (or Frames)
Action: Rotate model with mouse, watch FPS counter
```

### Check FPS
```
❓ Is FPS > 45?
✅ YES (45-60 FPS) → Performance is good, continue
⚠️ MAYBE (30-45 FPS) → Acceptable, but optimize if needed
❌ NO (<30 FPS) → See troubleshooting below
```

### Check Memory
```
Tab: Memory
Action: Record heap snapshot
Check: Memory usage < 200MB
```

---

## 🖱️ Step 4: Interaction Test (2 min)

### Rotate Model
```
Action: Click and drag mouse on model
Expected: Model rotates smoothly
Issues: Stuttering? Lag? See troubleshooting
```

### Zoom In/Out
```
Action: Use mouse scroll wheel
Expected: Model zooms smoothly
Issues: Stuck? See troubleshooting
```

### Hover Model (H4-Ready)
```
Action: Move mouse over model
Expected: (Optional) Subtle glow effect (H4 feature, may not be active yet)
```

---

## 🆘 Troubleshooting (Quick Fixes)

### Issue: Model Still Invisible
```
Fix 1: Press Ctrl+Shift+R (cache might be stale)
Fix 2: Check console (F12) for red errors
Fix 3: Verify file path: public/models/glb/ENSAYO1.glb exists
Fix 4: Restart server: Ctrl+C, then "npm run dev"
```

### Issue: FPS Below 40
```
Fix 1: Reduce shadow resolution in Scene.tsx:
       shadow-mapSize-width={1024}   # Was 2048
       shadow-mapSize-height={1024}  # Was 2048

Fix 2: Lower light intensities:
       <ambientLight intensity={0.15} /> # Was 0.2
       <directionalLight intensity={1.0} /> # Was 1.5

Fix 3: Comment out ContactShadows temporarily:
       {/* <ContactShadows ... /> */}
```

### Issue: Model Looks Flat (No 3D Feel)
```
Fix 1: Verify <Environment /> is active in Scene.tsx
       Should see golden/warm reflections on model

Fix 2: Try different HDRI preset:
       <Environment preset="studio" background={false} />
       
Fix 3: Increase directional light:
       <directionalLight intensity={2.0} />  # Was 1.5
```

### Issue: No Shadows Under Model
```
Fix 1: Verify ContactShadows Y position is below model:
       <ContactShadows position={[0, -1, 0]} />

Fix 2: Increase opacity:
       <ContactShadows opacity={0.8} />  # Was 0.5

Fix 3: Increase scale:
       <ContactShadows scale={15} />  # Was 10
```

### Issue: Console Errors (Red Messages in F12)
```
Common errors:
- "Cannot find module '@react-three/drei'" 
  → Solution: npm install --legacy-peer-deps, restart

- "THREE is not defined"
  → Solution: Already handled, try hard refresh

- "ENSAYO1.glb not found"
  → Solution: Check file path, verify file exists
```

---

## ✅ H2 Success Checklist

Mark each as you verify:

- [ ] Background is BLACK (not gradient)
- [ ] Model has cinematic lighting (realistic, not flat)
- [ ] HDRI reflections visible on model
- [ ] Contact shadows ground the object
- [ ] FPS > 45 when rotating
- [ ] No console errors (F12 → Console tab is clean)
- [ ] Model rotates smoothly
- [ ] Zoom works (scroll wheel)
- [ ] No memory leaks (Memory tab stable)

**If ALL checked:** H2 is SUCCESS! ✅

---

## 📊 FPS Reference

| Range | Quality | Action |
|-------|---------|--------|
| 60 FPS | Perfect | Continue to H3 |
| 45-59 FPS | Good | Continue to H3 |
| 30-44 FPS | Acceptable | OK for now, optimize in H7 |
| <30 FPS | Poor | Fix now (see troubleshooting) |

---

## 🎬 Next Step

Once all checks pass:

1. **Optional:** Test different HDRI presets:
   ```
   Try "city", "studio", "dawn"
   Pick your favorite, note it for later
   ```

2. **Adjust Scale if Needed:**
   Edit Scene.tsx, find EpicModel:
   ```tsx
   <EpicModel
     modelUrl="/models/glb/ENSAYO1.glb"
     scale={[0.5, 0.5, 0.5]}  // Adjust this value if too big/small
     ...
   />
   ```

3. **Commit Progress:**
   ```powershell
   git add components/Scene.tsx components/EpicModel.tsx components/AutoGLB.tsx
   git commit -m "H2: Cinematographic lighting + HDRI

   - 3-light schema (ambient, key, fill)
   - Environment HDRI preset active
   - Contact shadows grounding effect
   - PCFSoftShadowMap for soft shadows
   - EpicModel hover glow support added
   - FPS stable > 45"
   
   git log --oneline -1  # Verify commit
   ```

4. **Move to H3:**
   Open `H3_BLOOM_GUIDE.md` (coming next hour)

---

## 💡 Pro Tips

1. **Adjust lighting in real-time:**
   - Edit Scene.tsx intensity values
   - Save file (Ctrl+S)
   - Browser auto-reloads
   - No manual refresh needed

2. **Compare HDRI presets:**
   - Change `preset="sunset"` to `preset="city"`
   - Save
   - Instantly see the difference
   - Pick the one that matches your brand

3. **Performance tuning:**
   - Start with high settings
   - Lower incrementally
   - Find the sweet spot (45+ FPS)
   - That's your production setting

4. **Mobile preview:**
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Test on iPhone 12 viewport
   - Note FPS on mobile (should be >30)

---

**Status: Ready for H2 visual test!** 🚀

Open http://localhost:3000 now and follow the checklist above.
