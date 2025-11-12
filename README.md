# Rumorr MVP — Interactive 3D Lead Capture

**Build an interactive 3D experience in 8 hours. Capture qualified leads. Validate your market.**

> Stack: Next.js + TypeScript + React Three Fiber + Tailwind CSS

---

## 🚀 Quick Start (5 min)

### Prerequisites
- Node.js 18+ installed
- Git configured

### Setup

```powershell
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

Open http://localhost:3000 → You should see a purple 3D rotating object + "Contacto" button.

---

## 📖 Documentation (READ IN THIS ORDER)

1. **`START_HERE.md`** ← Begin here (2 min read)
2. **`SPRINT_CHECKLIST.md`** ← Your hourly roadmap (8h execution)
3. **`METRICS_PROJECTION.md`** ← Expected outcomes + growth model
4. **`EXECUTIVE_SUMMARY.md`** ← Business context + strategy
5. **`COMMAND_REFERENCE.md`** ← Copy-paste commands

---

## 🏗️ Project Structure

```
rumorr-mvp/
├── pages/
│   ├── index.tsx              # Home page + Scene
│   ├── _app.tsx               # App wrapper + Tailwind
│   └── api/
│       └── leads.ts           # POST /api/leads → save to data/leads.json
├── components/
│   ├── Scene.tsx              # 3D canvas (React Three Fiber)
│   └── LeadModal.tsx          # Lead capture form
├── lib/
│   └── useAnonId.ts           # Generate & track user ID
├── styles/
│   └── globals.css            # Tailwind + base styles
├── public/
│   └── models/glb/            # Your 3D GLTF/GLB files (add here)
├── data/
│   └── leads.json             # Captured leads (auto-updated)
├── SPRINT_CHECKLIST.md        # Your 8-hour roadmap
├── METRICS_PROJECTION.md      # Business projections
└── README.md                  # This file
```

---

## 🎯 Core Features (Ready to Go)

- ✅ **3D Interactive Scene** (React Three Fiber + OrbitControls)
- ✅ **Lead Capture Form** (Tailwind-styled modal)
- ✅ **Anonymous Tracking** (localStorage-based `anonId`)
- ✅ **Analytics API** (`POST /api/leads` → `data/leads.json`)
- ✅ **Responsive Design** (Tailwind CSS)
- ✅ **TypeScript** (fully typed)

---

## 📋 Your 8-Hour Sprint

| Hour | Task | Deliverable |
|------|------|-------------|
| **H1** | Add your 3D model | GLB renders on screen |
| **H2** | Lighting + environment | Cinematic atmosphere |
| **H3** | Materials + bloom | Polished visuals |
| **H4** | Interactions + feedback | Hover glow, click triggers |
| **H5** | Narrative + UI | Branded, story-driven |
| **H6** | Lead capture + analytics | Form works, data saved |
| **H7** | Optimization + mobile | Fast, responsive |
| **H8** | Deploy to Vercel | Live URL + leads dataset |

---

## 🔌 API Reference

### POST `/api/leads`
**Captures a lead submission.**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "anonId": "a_abc123xyz",
  "utm": {
    "source": "twitter",
    "medium": "social",
    "campaign": "mvp_launch"
  }
}
```

**Response:**
```json
{
  "ok": true,
  "lead": { /* your submission + _receivedAt */ }
}
```

**Data saved to:** `data/leads.json` (auto-appended on each POST)

---

## 🌐 Deployment

### To Vercel (Recommended)

```powershell
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel
```

Follow prompts → link GitHub repo → auto-deploy on every `git push`.

### Manual Steps
1. `git add . && git commit -m "MVP ready"`
2. `git push origin main`
3. Go to vercel.com → Import Project → select your repo
4. Deploy takes 2–3 min

---

## 📊 Expected Outcomes (Day 8)

| Metric | Conservative | Target | Optimistic |
|--------|--------------|--------|-----------|
| **Visitors** | 100–150 | 300–500 | 800–1200 |
| **Leads** | 10–15 | 30–75 | 80–180 |
| **Conversion Rate** | ~10% | 10–15% | 10–20% |
| **Avg Time-on-Scene** | 35–45s | 60–75s | 75–90s |
| **FPS (Desktop)** | >50 | >60 | 60 |

See **`METRICS_PROJECTION.md`** for detailed breakdown.

---

## 🛠️ Common Tasks

### Replace 3D Model
1. Save your `.glb` to `public/models/glb/your_model.glb`
2. Update `components/Scene.tsx` → use `useGLTF()` to load it
3. Adjust `scale`, `position`, `rotation` as needed

### Add Lights
Edit `components/Scene.tsx` → add `<pointLight>`, `<ambientLight>`, etc.

### Deploy Changes
```powershell
git add .
git commit -m "H2: Add lighting and environment"
git push origin main
# Vercel auto-deploys (~2 min)
```

### Check Leads
```powershell
cat data/leads.json
```

---

## ⚠️ Important Notes

- **Lead Storage:** Uses local `data/leads.json` (git-tracked). For production, upgrade to PostgreSQL or Supabase.
- **Model Optimization:** Keep GLB files < 2MB (use DRACO compression for larger models).
- **Mobile Testing:** Test on real device (DevTools mobile emulation ≠ real mobile performance).
- **Vercel Free Tier:** Limited to 100GB bandwidth/month and 12 function invocations/sec (fine for MVP).

---

## 🚨 Troubleshooting

### "Port 3000 already in use"
```powershell
taskkill /IM node.exe /F
npm run dev
```

### "Cannot find module @react-three/fiber"
```powershell
npm install --legacy-peer-deps
```

### "TypeScript errors in components"
Files are valid TypeScript; errors usually disappear after restart. Try:
```powershell
rm -r .next
npm run dev
```

### "Leads not saving"
Check browser console (F12) → Network tab → POST /api/leads → response. Check `data/leads.json` manually.

---

## 📞 Resources

- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **Three.js:** https://threejs.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/
- **Next.js:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

---

## 🎯 Next Steps

1. **Read `START_HERE.md`** (2 min)
2. **Prepare your 3D model** (15 min)
3. **Start H1** (45 min)
4. **Check back every hour** to move to next phase

---

**Your 8-hour timer starts now. Good luck! 🚀**
