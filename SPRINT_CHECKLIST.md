# 🚀 RUMOR.RED – Hoja de Ruta del Sprint (Construyendo la Matrix)

**Hora de Inicio:** AHORA (Nov 12, 2025)
**Estado del Andamiaje:** ✅ LISTO (`npm run dev` lanzado)
**Objetivo:** URL en vivo + base de datos de "desconectados" al final del sprint.

---

## ⏱️ DESGLOSE HORARIO (El Protocolo de Construcción)

### **H0 (AHORA): Verificación del Sistema**
- [ ] `npm run dev` running → http://localhost:3000 accessible
- [ ] La `Scene` (Matrix) se renderiza (modelo 3D `TORO.glb` visible con iluminación cinematográfica).
- [ ] El botón de `LeadModal` ("Desconexión") aparece (abajo a la derecha).
- [ ] El formulario envía datos a `/api/leads` (verifica en la terminal o `data/leads.json`).

**Resultado Esperado:** Luz verde para proceder. Sin bloqueos. ✅

---
## **I. FASE DE INMERSIÓN — LA GESTALT DEL OBJETO**
## **HORA 1 (0:00–1:00): Integración del Artefacto 3D (TORO.glb)**

**Objetivo:** Asegurar que el modelo `TORO.glb` se muestre correctamente y se integre en la `Scene`.

### Checklist:
- [ ] **Copy your `.glb` file** to `public/models/glb/TORO.glb`
- [ ] **Update `components/Scene.tsx`:**
  ```tsx
  // The model URL is already set to:
  <AutoGLB modelUrl="/models/glb/TORO.glb" />
  ```
- [ ] **Adjust scale:** Model should fill ~60% of canvas
  - Try `scale={[2, 2, 2]}` → adjust as needed
- [ ] **Test in browser:** Rotate with mouse, confirm no clipping
- [ ] **Performance check:** DevTools → FPS > 50

**Estimated Effort:** 45 min  
**Blockers to Watch:** GLTF parse errors, File too large (>5MB → compress DRACO later)

**Success Criteria:**
*   ✅ El modelo se renderiza limpiamente, respetando la **Continuidad** visual.
*   ✅ Rota automáticamente (OrbitControls), permitiendo la **Exploración** sin fricción.
*   ✅ No hay errores en la consola, manteniendo la **Integridad Perceptual**.
*   ✅ El modelo ocupa aproximadamente el 60% del lienzo, logrando una **Proximidad** equilibrada con el entorno.
---

## **HOUR 2 (1:00–2:00): Lighting + Environment**

**Goal:** Make the 3D scene feel EPIC. Lighting is 80% of visual magic.

### Checklist:
- [ ] **Add HDRI Environment** (from `@react-three/drei`):
  ```tsx
  import { Environment } from '@react-three/drei'
  // In <Canvas>:
  <Environment preset="sunset" /> // or "city", "dawn", "forest"
  ```
- [ ] **Adjust 3 Light Tiers:**
  - **Ambient:** Set to 0.4 (soft base)
  - **Directional (key light):** Position [5, 5, 5], intensity 1.2
  - **Point light (accent):** Position [-5, -5, 5], intensity 0.6, color #0088ff
- [ ] **Enable Shadows:**
  ```tsx
  <Canvas shadows={{ type: THREE.PCFShadowMap }}>
  // Add castShadow={true} to lights
  ```
- [ ] **Test:** Rotate model → shadows move realistically

**Estimated Effort:** 45 min  
**Success Criteria:**
- ✅ Model looks 3D with depth
*   ✅ El modelo presenta profundidad 3D, potenciando la **Figura/Fondo**.
*   ✅ Las sombras son realistas, anclando el objeto en el espacio y reforzando la **Continuidad**.
*   ✅ El ambiente general es cinematográfico, no plano, creando una **Autoridad Estética**.
---

## **HOUR 3 (2:00–3:00): Materials + Post-Processing**

**Goal:** Add polish—bloom, color grading, subtle glow.

### Checklist:
- [ ] **Refine Model Materials** (if model is GLB, materials come with it):
  - Adjust `roughness: 0.3` → 0.2 for more shine
  - Adjust `metalness: 0.5` → 0.7 for reflectivity
- [ ] **Add Bloom Effect:**
  ```tsx
  import { EffectComposer, Bloom } from '@react-three/postprocessing'
  // Wrap scene in <EffectComposer>
  <Bloom intensity={1.5} luminanceThreshold={0.2} />
  ```
- [ ] **Add optional Noise/Grain** (subtle, <0.05 strength)
- [ ] **Adjust Camera:** FOV 50, position [0, 0, 5] (tweak if needed)
- [ ] **Performance profiling:** DevTools → Lighthouse, check FPS under load

**Estimated Effort:** 45 min  
**Success Criteria:**
- ✅ Model glows subtly with bloom
*   ✅ El modelo brilla sutilmente con bloom, añadiendo un toque de **Misterio como Magnetismo**.
*   ✅ Los materiales tienen un aspecto pulido, contribuyendo a la **Autoridad Estética**.
*   ✅ FPS estable > 45 en escritorio, asegurando una **Continuidad** fluida.
---

## **HOUR 4 (3:00–4:00): Interaction + Microfeedback**

**Goal:** Each click/hover triggers feedback. Engagement hook.

### Checklist:
- [ ] **Hover glow on model:**
  ```tsx
  const [hovered, setHovered] = useState(false)
  // On <mesh>: onPointerOver={() => setHovered(true)}
  // Change material color or emission when hovered
  ```
- [ ] **Click trigger (explode animation):**
  ```tsx
  const [clicked, setClicked] = useState(0)
  // onClick={() => setClicked(clicked + 1)}
  // Trigger: scale += 0.1, rotate += 45deg over 0.5s
  ```
- [ ] **Send interaction event to `/api/leads`:**
  ```tsx
  // POST: { anonId, event: 'click', timestamp, clicks: N }
  ```
- [ ] **Optional: particle burst on click** (use `useTexture` + Points)
- [ ] **Micro toast feedback:** "Click #3!" in corner
- [ ] **Test:** 5+ clicks, confirm events logged in terminal

**Estimated Effort:** 60 min  
**Success Criteria:**
- ✅ Visual feedback on hover
*   ✅ Retroalimentación visual al pasar el ratón, fomentando la **Participación**.
*   ✅ Animación al hacer clic (suave, no brusca), manteniendo la **Continuidad**.
*   ✅ Los eventos se envían a la API y aparecen en `data/leads.json`, validando la **Micro-validación**.
*   ✅ No hay retrasos en clics rápidos, asegurando una **Experiencia Fluida**.
---

## **HOUR 5 (4:00–5:00): Narrative + UI Polish**

**Goal:** Tell a story. Make the CTA irresistible.

### Checklist:
- [ ] **Update LeadModal copy:**
  - Headline: Something about YOUR product (not placeholder)
  - Button text: Instead of "Contact" → "Descubre más" or "Sé parte del viaje"
- [ ] **Dynamic gradient in UI:**
  ```tsx
  // Gradient changes color based on scene state
  bg-gradient-to-r from-purple-900 via-black to-blue-900
  // Sync with interaction count: change hue every 5 clicks
  ```
- [ ] **Modal appearance trigger:**
  - Show modal AFTER 3 clicks OR after 20 seconds (whichever first)
  - Optional: Add subtle animation on entrance (fade + scale)
- [ ] **Form validation + UX:**
  - Email validation
  - Clear error messages
  - Loading state on submit button
- [ ] **Tailwind polish:**
  - Button hover state (shadow, scale 1.05)
  - Input focus states (ring glow)
  - Responsive: test on mobile viewport

**Estimated Effort:** 60 min  
**Success Criteria:**
- ✅ Modal text aligns with product story
*   ✅ El texto del modal se alinea con la historia del producto, reforzando la **Narrativa y el Significado**.
*   ✅ La UI se siente premium (sin vibraciones de marcador de posición), contribuyendo a la **Autoridad Estética**.
*   ✅ El modal se activa en el momento adecuado (ni demasiado pronto, ni demasiado tarde), optimizando la **Expercepción del Usuario**.
*   ✅ La UX del formulario es fluida, manteniendo la **Continuidad** de la interacción.
---

## **HOUR 6 (5:00–6:00): Lead Capture + Analytics**

**Goal:** Ensure every lead is captured. Instrument core metrics.

### Checklist:
- [ ] **Confirm anonId flow:**
  - `getOrCreateAnonId()` generates on first visit
  - Stored in localStorage (survives page reload)
  - Included in every lead POST
- [ ] **POST lead data structure:**
  ```json
  {
    "name": "John",
    "email": "john@example.com",
    "anonId": "a_abc123xyz",
    "utm": { "source": "twitter", "medium": "social" },
    "clicks": 5,
    "timeOnScene": 45,
    "_receivedAt": "2025-11-11T12:34:56Z"
  }
  ```
- [ ] **Track time-on-scene:**
  ```tsx
  useEffect(() => {
    const start = Date.now()
    return () => console.log(`Time on scene: ${Date.now() - start}ms`)
  }, [])
  ```
- [ ] **Test lead capture:**
  - Fill form → Submit
  - Reload repo → `git status` → check `data/leads.json`
  - Confirm 1 lead saved with all fields
- [ ] **Mobile test:** Open on phone, fill + submit, confirm lead saved

**Estimated Effort:** 45 min  
**Success Criteria:**
- ✅ Leads write to `data/leads.json` cleanly (valid JSON)
*   ✅ Los leads se escriben en `data/leads.json` limpiamente (JSON válido), asegurando la **Integridad de los Datos**.
*   ✅ `anonId` persiste entre recargas de página, manteniendo la **Continuidad** de la identidad.
*   ✅ Cada campo capturado (nombre, email, anonId, timestamp), para una **Analítica Completa**.
*   ✅ No hay errores de API (500s o 405s en la consola), garantizando la **Fiabilidad del Sistema**.
---

## **HOUR 7 (6:00–7:00): Optimization + Mobile**

**Goal:** Ship a fast, responsive MVP.

### Checklist:
- [ ] **Model optimization:**
  - Check file size: target <2MB (if >5MB, compress with DRACO)
  - Optional: Add LOD (low-poly fallback for mobile)
- [ ] **Lazy load assets:**
  ```tsx
  import dynamic from 'next/dynamic'
  const Scene = dynamic(() => import('../components/Scene'), { ssr: false })
  ```
- [ ] **Responsive canvas:**
  ```tsx
  // Canvas already responsive by default in R3F
  // Test: Resize browser → canvas scales smoothly
  ```
- [ ] **Mobile performance check:**
  - Open on actual phone (iPhone/Android)
  - Interact for 30 seconds
  - Check DevTools → Performance → FPS, memory
  - Target: >30 FPS on mobile
- [ ] **Accessibility audit:**
  - Form labels present
  - Button has aria-label
  - Color contrast OK (Lighthouse check)

**Estimated Effort:** 45 min  
**Success Criteria:**
- ✅ Desktop FPS > 50, Mobile FPS > 30
*   ✅ FPS de escritorio > 50, FPS móvil > 30, garantizando la **Fluidez y Continuidad**.
*   ✅ El modelo carga en <3 segundos, manteniendo la **Inmediatez Perceptual**.
*   ✅ No hay cambios de diseño, asegurando la **Estabilidad Visual**.
*   ✅ Puntuación de Lighthouse > 80, validando la **Optimización General**.
---

## **HOUR 8 (7:00–8:00): Deploy to Vercel**

**Goal:** Live URL. Real users. Real data.

### Checklist:
- [ ] **Git commit & push:**
  ```bash
  git add .
  git commit -m "MVP ready: 3D interactive experience with lead capture"
  git push origin main
  ```
- [ ] **Connect to Vercel:**
  - Visit vercel.com → Import Project → select your repo
  - Select Next.js framework (auto-detected)
  - Deploy (takes ~2–3 min)
- [ ] **Smoke test:**
  - Open Vercel URL in browser
  - Scene renders? ✅
  - Click model 3+ times? ✅
  - Submit form? ✅
  - Lead appears in `data/leads.json` on GitHub? ✅
- [ ] **Share link:**
  - Copy Vercel URL → post to Slack/Discord/Twitter
  - Monitor for first 5–10 leads
- [ ] **Monitor:**
  - Check `data/leads.json` in repo for incoming submissions
  - Note any errors in Vercel logs (vercel.com → Deployments → Logs)

**Estimated Effort:** 45 min  
**Success Criteria:**
- ✅ Live URL works (no 500 errors)
*   ✅ La URL en vivo funciona (sin errores 500), confirmando la **Disponibilidad del Sistema**.
*   ✅ Se puede enviar el formulario desde la URL en vivo, validando la **Interacción Completa**.
*   ✅ Los leads se guardan en `data/leads.json` (en GitHub), asegurando la **Captura de Datos**.
*   ✅ Tiempo de carga <2s en escritorio, manteniendo la **Velocidad de Acceso**.
---

## 📊 **PROJECTION: Expected Outcomes**

### **By End of H8:**

| Metric | Conservative | Optimistic | Notes |
|--------|---------------|-----------|-------|
| **Project Status** | MVP live on Vercel | MVP live + analytics dashboard | Scaffold complete |
| **Visual Polish** | Good (lighting + bloom) | Excellent (custom materials) | Depends on model quality |
| **Lead Capture** | Working (no errors) | Working + attributed (UTM ready) | API tested |
| **Leads Captured (24h)** | 5–15 | 50–100 | If shared to 2–3 channels |
| **Avg Time-on-Scene** | 30–45 sec | 60–90 sec | Indicates engagement |
| **Click Rate (% who interact)** | 40% | 70% | Glow feedback → incentivizes |
| **Conversion (lead/visitor)** | 10% | 25% | Pre-filter: interested users |

### **Next 48 Hours (Post-MVP):**
1. Collect 50–100 leads → validate market interest
2. Identify highest-engagement users (clicks, time-on-scene)
3. Refine narrative based on feedback
4. A/B test headline + CTA text
5. Scale to 3–5 channels → measure CAC

---

## 🎯 **Critical Reminders**

1. **Every minute counts.** Don't refactor. If it works, ship it.
2. **Keep scope tight.** No new features mid-sprint (features = death of MVPs).
3. **Test on mobile early** (H4, not H8).
4. **Save your GLB file before H1** so you're not blocked.
5. **Vercel has no database.** Leads go to `data/leads.json` in the repo (good for MVP, upgrade later).

---

## 📱 **Tech Stack (Reference)**
- **Frontend:** Next.js + TypeScript + React Three Fiber + Tailwind
- **3D:** three.js + @react-three/drei (presets, controls, loaders)
- **Storage:** `data/leads.json` (upgrade to Supabase/Postgres for scale)
- **Deploy:** Vercel (automatic, free tier OK for MVP)
- **Analytics:** Manual tracking via `/api/leads` endpoint (anonId + events)

---

**LET'S GO! 🚀**

Your scaffold is ready. Now it's about execution velocity.

**Next Step:** Start H1. Get your GLB file ready. Run `npm run dev`. See your model on screen.

Check back in 1 hour with updates.
