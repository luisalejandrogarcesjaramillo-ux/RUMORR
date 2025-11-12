# 🎬 RUMORR MVP — FINAL INSTRUCTIONS

## ⏰ **Your 8-Hour Sprint Starts NOW**

**Date:** Nov 11, 2025  
**Scope:** Interactive 3D MVP + lead capture + deploy  
**Expected Outcome:** Live Vercel URL + 30–75 qualified leads + engagement data

---

## 📖 **READ THESE FIRST (In Order)**

1. ✅ **`START_HERE.md`** (2 min) ← You are here
2. 📋 **`SPRINT_CHECKLIST.md`** (5 min) ← Your hourly roadmap
3. 📊 **`METRICS_PROJECTION.md`** (3 min) ← What success looks like

**Then:** Jump to **H1 checklist in `SPRINT_CHECKLIST.md`** and start building.

---

## 🚀 **RIGHT NOW: Start H1 (45 min)**

### Three Simple Steps:

#### Step 1: Make sure dev server is running
```powershell
npm run dev
```
✅ Expected: `ready started server on 0.0.0.0:3000`

#### Step 2: Get your 3D model ready
- Find your `.glb` file (should be < 2MB)
- Place it here: `public/models/glb/your_model.glb`

#### Step 3: Update the code
- Open `H1_TEMPLATE.tsx` ← Copy the code
- Open `components/Scene.tsx` ← Replace everything with it
- Update path: `/models/glb/your_model.glb` ← Use YOUR filename
- Save and reload `http://localhost:3000`

✅ Expected: Your 3D model appears and rotates smoothly

---

## 📚 **Reference Docs (Use as Needed)**

| Doc | Purpose | When to Use |
|-----|---------|-----------|
| **`SPRINT_CHECKLIST.md`** | Hourly breakdown + tasks | Every hour |
| **`METRICS_PROJECTION.md`** | Expected outcomes | Decide next steps (Day 8) |
| **`EXECUTIVE_SUMMARY.md`** | Business context | Understand "why" |
| **`START_HERE.md`** | Quick onboarding | First 5 min |
| **`TROUBLESHOOTING.md`** | Common issues + fixes | When stuck |
| **`COMMAND_REFERENCE.md`** | Copy-paste commands | Save time |
| **`DAILY_LOG.md`** | Track YOUR progress | End of each hour |
| **`README.md`** | Full tech reference | Technical details |
| **`H1_TEMPLATE.tsx`** | Example H1 code | When replacing model |

---

## 🎯 **Your Hourly Targets (Copy to Calendar)**

```
H1 (0:00–0:45)  → 3D model on screen
H2 (0:45–1:30)  → Cinematic lighting + environment
H3 (1:30–2:15)  → Bloom effect + polish
H4 (2:15–3:15)  → Hover glow + click feedback
H5 (3:15–4:15)  → Story + UI gradients
H6 (4:15–5:00)  → Form works + anonId tracked
H7 (5:00–5:45)  → Mobile test + optimization
H8 (5:45–6:30)  → Deploy to Vercel + live
```

---

## 📊 **Success Criteria (End of Day 8)**

All 8 should be ✅:

- ✅ Live URL on Vercel (e.g., `rumorr-mvp.vercel.app`)
- ✅ Model renders cleanly (no clipping, good scale)
- ✅ Interactive (hover glow, click animation)
- ✅ Form captures name + email → `data/leads.json`
- ✅ 30+ leads in JSON (check GitHub)
- ✅ Avg engagement time > 45 sec
- ✅ Lighthouse score > 80
- ✅ Works on mobile (tested on real phone)

**If 8/8 ✅ → Your MVP is ready. Time to validate market.**

---

## 🛠️ **Quick Commands (Copy-Paste)**

### Start dev server
```powershell
npm run dev
```

### Test locally at
```
http://localhost:3000
```

### Check leads captured
```powershell
cat data/leads.json
```

### Deploy to Vercel
```powershell
vercel --prod
```

### See all commands
```powershell
# View COMMAND_REFERENCE.md
code COMMAND_REFERENCE.md
```

---

## 🆘 **If You Get Stuck**

**Before asking for help:**
1. Check `TROUBLESHOOTING.md` (most issues are there)
2. Open DevTools (F12) → Console → look for errors
3. Check file paths (case-sensitive)
4. Restart dev server (`Ctrl+C`, `npm run dev`)

**Common quick fixes:**
- **Port in use?** → `taskkill /IM node.exe /F`
- **Module not found?** → `npm install --legacy-peer-deps`
- **Model invisible?** → Increase scale or add lights
- **Form not submitting?** → Check console + Network tab (F12)

---

## 🎲 **Decisions You'll Make**

### After H1:
**"Does my model render cleanly?"**
- YES → Continue to H2
- NO → Debug (check TROUBLESHOOTING.md)

### After H4:
**"Are interactions smooth and engaging?"**
- YES → Continue to H5
- NO → Tweak feedback, move to H5

### After H8:
**"Did I hit KPI targets (30+ leads, 60+ sec engagement)?"**
- YES (80+ leads) → **SCALE** (invest in ads)
- MAYBE (30–80 leads) → **ITERATE** (tweak copy/visuals)
- NO (<30 leads) → **PIVOT** (rethink premise)

---

## 📈 **Day 9+ (What You'll Do After This Sprint)**

If metrics are good:
1. Review leads in `data/leads.json`
2. Draft follow-up email sequence
3. Plan paid ads or organic growth
4. Add features (A/B testing, more 3D scenes, gamification)
5. Scale to real database (Supabase, Postgres)

If metrics are weak:
1. Interview your 5–10 leads
2. Identify what's not resonating
3. Iterate on narrative or visuals
4. Relaunch with changes

---

## 🎬 **NOW: Let's Begin**

**Next action:**
1. Open `SPRINT_CHECKLIST.md`
2. Find "H1: Replace 3D Model + Scale"
3. Follow the checklist
4. When done, update `DAILY_LOG.md`
5. Move to H2

---

## ⏱️ **Timer Starts: GO!**

Your 8 hours begin now. Every minute counts. **Don't perfection—ship fast, iterate after.**

**Your MVP is your validation tool, not your final product.**

---

**Questions?** Check docs above. If still stuck → TROUBLESHOOTING.md.

**Ready?** Open `SPRINT_CHECKLIST.md` and start H1. 🚀
