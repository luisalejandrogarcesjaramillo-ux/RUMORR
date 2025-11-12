# 📊 RUMORR MVP — Executive Summary

**Project:** Interactive 3D lead-capture MVP  
**Timeline:** 8 hours (1 day sprint)  
**Status:** ✅ Scaffold ready → Start H1 now  
**Target Outcome:** Live MVP + 80–140 qualified leads by end of Day 1

---

## 🎯 **The Idea**

**Problem:** Lead capture forms are boring. Conversion rates are low (1–5%).

**Solution:** Interactive 3D experience (rotating object + storytelling) with embedded lead capture.

**Why it works:**
- ✨ **Novelty:** Few B2B experiences are interactive 3D → memorable
- 🎮 **Engagement:** Users spend 45–90 sec interacting (vs. 2 sec for typical landing page)
- 💰 **Signal:** Someone who spends 60+ sec = serious buyer (pre-filter)
- 📱 **Social:** Viral coefficient ~0.3–0.5 (each lead brings 0.3–0.5 more users)

**Outcome:** Higher quality leads at lower CAC.

---

## 📈 **8-Hour Sprint: What You're Building**

| Hour | What | Duration |
|------|------|----------|
| **H1** | Replace placeholder 3D, scale, confirm renders | 45 min |
| **H2** | Add HDRI environment, lighting, shadows | 45 min |
| **H3** | Bloom effect, materials polish, performance tune | 45 min |
| **H4** | Hover glow, click trigger, interaction events | 60 min |
| **H5** | Narrative, UI polish, gradient dynamics | 60 min |
| **H6** | Lead capture form, anonId, analytics | 45 min |
| **H7** | Optimization (DRACO, LOD, mobile test) | 45 min |
| **H8** | Deploy to Vercel, smoke test, live | 45 min |
| **Post-Deploy** | Monitor leads, collect data, decide next step | ongoing |

---

## 🛠️ **Tech Stack**

| Layer | Choice | Why |
|-------|--------|-----|
| **Frontend** | Next.js 14 + TypeScript | Fast iteration, Vercel deploy native |
| **3D** | React Three Fiber (@react-three/drei) | Thin wrapper on Three.js, React-friendly |
| **UI** | Tailwind CSS | Quick styling, responsive |
| **Storage** | `data/leads.json` (local) | MVP only; upgrade to DB later |
| **Deploy** | Vercel | Zero config, free tier, perfect for MVP |
| **Analytics** | Manual (anonId + event queue) | No external dependencies, 100% data control |

---

## 💾 **Data Model (Leads)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "anonId": "a_abc123xyz",
  "clicks": 5,
  "timeOnScene": 63,
  "utm": {
    "source": "twitter",
    "medium": "social",
    "campaign": "mvp_launch"
  },
  "_receivedAt": "2025-11-11T12:34:56Z"
}
```

**Where:** `data/leads.json` (committed to git, updated on every form submission)

**Access:** Git repo → `data/leads.json` → view raw → copy JSON → paste into CRM

---

## 🎲 **Expected Outcomes (Day 8)**

### **Conservative** (baseline, no issues)
- 📊 100–150 visitors (from 1–2 channels)
- 📝 10–15 leads captured
- ⏱️ Avg time-on-scene: 35–45 sec
- 🔄 Engagement rate: 40% (interact with 3D)
- ✅ Zero bugs, form works smoothly

### **Target** (assuming solid execution)
- 📊 300–500 visitors (from 3 channels)
- 📝 30–75 leads captured
- ⏱️ Avg time-on-scene: 60–75 sec
- 🔄 Engagement rate: 60%
- ✅ Lighthouse score > 85

### **Optimistic** (viral acceleration)
- 📊 800–1200 visitors (organic shares)
- 📝 80–180 leads captured
- ⏱️ Avg time-on-scene: 75–90 sec
- 🔄 Engagement rate: 70%
- ✅ Social shares from early users

---

## 📋 **Decisions: What to Track**

After Day 8, you'll make one of three decisions:

### ✅ **Scale** (if leads > 80 + engagement metrics strong)
→ Invest in paid ads, refine narrative, add email sequence

### 🔄 **Iterate** (if leads 30–80 + some metrics weak)
→ Tweak visuals/copy, add social proof, test different CTAs

### 🛑 **Pivot** (if leads < 20 or time-on-scene < 30s)
→ Wrong audience or experience doesn't engage; explore different narrative

**Key Insight:** By Day 8, you'll have data to decide the next $X0k spend. That's the entire point of an MVP.

---

## 💰 **CAC Projection (If Scaling)**

Assuming best-case (80 leads, Day 8):

| Scenario | Users | Leads | Organic CAC | Paid CAC (at $100 budget) |
|----------|-------|-------|------------|--------------------------|
| **Day 1–8** | 500 | 80 | $0 (organic) | N/A |
| **Day 9–30** | 5000 | 400 | ~$0 (word-of-mouth) | $0.25–$0.50 (if $100 ads) |
| **Month 2** | 20k+ | 1500–2500 | Improving | $0.10–$0.25 (viral + paid) |

**Implication:** By Month 2, you're looking at **$0.10–$0.50 CAC** if you play this right. Compare to typical SaaS (1.50–5.00 CAC for early stage).

---

## ✨ **Why This Matters (Your Moat)**

1. **Credibility:** Interactive 3D experience signals sophistication → attracts serious founders
2. **Differentiation:** 95% of landing pages are static text/video. Yours is interactive.
3. **Data:** You capture intent (clicks, time-on-scene) + contact info. Most capture only emails.
4. **Velocity:** 8 hours to live MVP → proves you can execute fast

---

## 🚀 **Next 48 Hours (Post-MVP)**

| Milestone | Action | Time |
|-----------|--------|------|
| **Day 1 (H0–H8)** | Launch MVP | 8h sprint |
| **Day 2 (Morning)** | Check leads, fix bugs | 2h |
| **Day 2 (Afternoon)** | Refine copy/visuals based on feedback | 2h |
| **Day 3** | Prep paid ads or iterate based on data | 4h |

---

## ⚠️ **Critical Reminders**

1. **Don't perfectionism.** If it works, ship it. Polish later.
2. **Test on mobile first** (50% of traffic will be mobile).
3. **Keep the 3D model < 2MB** (aim for <1.5MB with DRACO).
4. **Check form validation** (empty emails should not save).
5. **Monitor Vercel logs** for crashes/errors post-deploy.

---

## 📞 **Support References**

- **React Three Fiber docs:** https://docs.pmnd.rs/react-three-fiber
- **Three.js docs:** https://threejs.org/docs/
- **@react-three/drei:** https://github.com/pmndrs/drei
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel deployment:** https://vercel.com/docs

---

## 🎯 **End of Day 8: Success Looks Like**

✅ Live URL on Vercel (e.g., `rumorr-mvp.vercel.app`)  
✅ Interactive 3D model rendering smoothly  
✅ Form submissions captured to `data/leads.json`  
✅ 30–80 leads in dataset  
✅ Avg time-on-scene > 45 sec (engagement ≈ real)  
✅ Lighthouse score > 80  
✅ Zero console errors  
✅ Mobile responsive (tested on real phone)  

**If all 8 ✅ → You have a validated MVP. Celebrate, then decide next step (scale, iterate, or pivot).**

---

**🚀 Ready? Go to `START_HERE.md` and begin H1.**

Good luck! 🎬
