# 🆘 RUMORR MVP — Troubleshooting Guide

**Quick fixes for common issues during the 8-hour sprint.**

---

## ⚡ Quick Fixes (Most Common)

### Problem: "Port 3000 already in use"
**Symptom:** Can't run `npm run dev` → Error about port 3000

**Fix:**
```powershell
# Kill all node processes
taskkill /IM node.exe /F

# Restart dev server
npm run dev
```

**Alternative:**
```powershell
# Use different port
npm run dev -- -p 3001
# Then open http://localhost:3001
```

---

### Problem: "Cannot find module @react-three/fiber"
**Symptom:** TypeScript/ESLint errors about missing modules

**Fix:**
```powershell
npm install --legacy-peer-deps
```

**Why:** Dependencies weren't fully installed. The `--legacy-peer-deps` flag allows npm to resolve conflicts.

---

### Problem: "GLB Model not showing"
**Symptom:** 
- Scene loads but object is invisible
- Console has no errors

**Likely Cause 1: Wrong file path**
```tsx
// Make sure path is correct:
useGLTF('/models/glb/your_model.glb')  // ✅ Correct
useGLTF('/public/models/glb/...')       // ❌ Wrong (don't include 'public')
useGLTF('./models/glb/...')             // ❌ Wrong (must start with /)
```

**Likely Cause 2: Model too small**
```tsx
// Try increasing scale:
scale={[2, 2, 2]}    // Current
scale={[5, 5, 5]}    // Try this
scale={[10, 10, 10]} // Or this
```

**Likely Cause 3: File not found**
- Check file exists: `c:\Users\assi\Desktop\RUMORR\public\models\glb\your_model.glb`
- Check spelling (case-sensitive on Linux, case-insensitive on Windows but Vercel uses Linux)
- File should be < 2MB (check file size)

**Debug:**
```tsx
const { scene } = useGLTF('/models/glb/your_model.glb')
console.log('Loaded scene:', scene)  // Add this to console.log
```

---

### Problem: "Model is black / not visible"
**Symptom:** 
- Model loads but appears completely black

**Likely Cause: Lighting issue**
```tsx
// Add more lights in your Lights() function:
function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />  // Increase from 0.5
      <directionalLight position={[5, 5, 5]} intensity={1.5} />  // Increase
      <directionalLight position={[-5, -5, 5]} intensity={0.8} /> // Add another
    </>
  )
}
```

**Likely Cause: Wrong camera position**
```tsx
// Camera might be inside the model
<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>  // Increase Z
```

---

### Problem: "Low FPS / Laggy interaction"
**Symptom:**
- Scene runs at < 30 FPS
- Rotation is jerky
- Form input lag

**Check performance first:**
1. Open DevTools (F12) → Performance tab
2. Click "Record" → Rotate model 3 seconds → Stop
3. Look for:
   - Rendering time (should be < 16ms for 60 FPS)
   - Memory bloat (should be < 500MB)

**Likely Cause 1: Model too heavy**
```tsx
// Temporarily reduce quality
<Canvas dpr={0.5}>  // Half resolution
  {/* ... */}
</Canvas>
```

**Likely Cause 2: Too many lights**
```tsx
// Remove unnecessary lights temporarily
function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Remove pointLight temporarily */}
    </>
  )
}
```

**Likely Cause 3: Post-processing too heavy**
```tsx
// Remove Bloom temporarily
// (or reduce intensity)
<Bloom intensity={0.5} />  // Reduce from 1.5
```

---

### Problem: "Form not submitting"
**Symptom:**
- Click "Enviar" button → nothing happens
- Or: "Loading..." state never clears

**Check 1: Form validation**
```tsx
// Make sure inputs have values
// Try submitting with:
// Name: "Test"
// Email: "test@example.com"
```

**Check 2: API is working**
1. Open DevTools (F12) → Network tab
2. Fill form and submit
3. Look for request to `/api/leads`
4. Check response status (should be 201 or 200)

**If no request appears:**
- Form validation failed (console will show error)
- JavaScript error (check Console tab)

**Check 3: data/leads.json file**
```powershell
# View current leads
cat data/leads.json

# Should be valid JSON like:
# [{"name":"Test","email":"test@example.com",...}]
```

**If file is not valid JSON:** 
- Something corrupted it. Reset:
```powershell
echo [] > data/leads.json
```

---

### Problem: "Build/Deploy fails on Vercel"
**Symptom:**
- Local `npm run dev` works fine
- But Vercel deployment fails

**Common Cause: TypeScript errors not caught locally**

**Fix:**
```powershell
# Check for TypeScript errors locally
npx tsc --noEmit

# If errors found, check them:
npm run lint
```

**Most likely:** Wrong import path (case sensitivity)

**Solution:** Make sure all imports use correct case (check against actual filenames).

---

### Problem: "My changes don't appear after git push"
**Symptom:**
- Made changes locally
- Ran `git add . && git commit && git push`
- But live Vercel site doesn't update

**Likely Cause: Vercel not auto-deploying**

**Fix:**
1. Go to vercel.com → Dashboard
2. Find your project
3. Go to "Settings" → "Git" → check "Auto-deploy from main" is ON
4. Or: Manually redeploy:
   - Click "Deployments"
   - Find latest deploy → click "..."→ "Redeploy"

**Alternative:**
```powershell
# Force redeploy via CLI
vercel --prod
```

---

### Problem: "Leads saved but email field is empty"
**Symptom:**
- `data/leads.json` has leads
- But `email` field is empty or missing

**Likely Cause: Form validation not enforced**

**Fix:** Ensure input has `required` attribute in `LeadModal.tsx`:
```tsx
<input
  type="email"
  required  // ← Add this
  placeholder="Email"
/>
```

---

## 🔍 Advanced Debugging

### Enable Verbose Logging

Add to `pages/api/leads.ts`:
```typescript
console.log('[DEBUG] Received body:', req.body)
console.log('[DEBUG] Saving to:', DATA_PATH)
```

Then check terminal output when form is submitted.

---

### Check Environment Variables

```powershell
# View all env vars
env

# Specific ones:
echo $env:NODE_ENV
```

---

### Browser DevTools Tips

**Console Tab:** Check for JavaScript errors
```javascript
// Try manually submitting:
fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', email: 'test@test.com', anonId: 'test_123', utm: {} })
}).then(r => r.json()).then(console.log)
```

**Network Tab:** 
- Filter by "Fetch/XHR"
- Look for `/api/leads` request
- Check response (should be 201 Created or 200 OK)

**Performance Tab:**
- Record interactions
- Look for bottlenecks (CPU, Memory, Network)

---

## ⏱️ When to Abandon (Cut Your Losses)

If you're stuck > 10 min on ONE problem:

1. **Scope it down:** Can you work around it?
   - Example: Model not loading → Use placeholder for now, optimize in H7
   
2. **Move to next hour:** Some issues resolve after moving forward
   - Example: Light tweak in H2 might fix H1 visibility issue
   
3. **Ask for help:** 
   - Share error message in Discord/community
   - Show exact code line that's failing

---

## 📋 Checklist Before Escalating

Before spending > 15 min on an issue:

- [ ] Checked browser console for errors? (F12)
- [ ] Restarted dev server? (`Ctrl+C`, `npm run dev`)
- [ ] Reinstalled dependencies? (`npm install --legacy-peer-deps`)
- [ ] Checked file paths (case, spelling)?
- [ ] Searched existing docs (README, SPRINT_CHECKLIST)?
- [ ] Googled error message?
- [ ] Tried on different browser?

---

## 🎯 Emergency Protocol (If Blocked)

**If completely stuck and can't proceed:**

1. **Save your work:** `git add . && git commit -m "checkpoint"`
2. **Document the issue:** Write down exact error, what you tried
3. **Skip and move on:** Come back after other hours are done
4. **Fallback:** Use placeholder/default to unblock next hour

Example:
- **H1 stuck?** Use torusKnot placeholder → proceed to H2 (can replace model later)
- **H4 stuck?** Skip interactions → proceed to H5 (lead capture still works)
- **H8 stuck?** Deploy what you have → collect data → iterate after

---

## 📞 When Something Works, Document It

After fixing an issue:
1. Note what you did in `DAILY_LOG.md`
2. Add comment to code explaining the fix
3. Consider if it's a reusable pattern

Example:
```tsx
// Fixed H1: GLB was not visible due to wrong scale
// Solution: Increased scale from [2, 2, 2] to [5, 5, 5]
// This model needs 5x default scale
scale={[5, 5, 5]}
```

---

**You've got this! Most problems have simple fixes. Stay focused! 🚀**
