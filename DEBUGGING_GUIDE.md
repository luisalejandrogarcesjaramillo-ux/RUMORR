# RUMOR.RED – Manual de Revisión y Debugging (Detectando Glitches en la Matrix)

## 🧭 Filosofía del Detective Digital (Agente de la Verdad)

En RUMORR, cada error es una **pista para restaurar la experiencia icónica**. No "arreglamos código", **restauramos un universo**. Adopta la mentalidad de un detective que sigue un rastro de evidencias hasta la verdad.

---

## 🔍 El Flujo de Trabajo (6 Pasos Metódicos)

### **Paso 1: Identificar el Síntoma**

Sé ultra-específico. Evita "no funciona" y describe exactamente qué ves:

```
❌ Mal: "La rotación está rota"
✅ Bien: "Al hacer clic por segunda vez, el contador avanza pero la narrativa no se actualiza en pantalla"
```

### **Paso 2: Aislar el Área**

Usa la arquitectura modular para localizar el problema:
- **¿Es un Glitch en la Simulación (3D)?** → Revisa `DynamicModel.tsx`, `useGLTF`, archivo `.glb`
- **¿Es un Fallo en el Estado de la Matrix (UX)?** → Revisa `useExperienceState.ts` (y los componentes que usan `useSelector`).
- **¿Es un Problema con el Oráculo (API/Datos)?** → Revisa `/api/leads.ts`, `useAnalytics.ts`
- **¿Es un Fallo en el Despliegue (Build/Deploy)?** → Revisa `next.config.js`, logs de Vercel

### **Paso 3: Consultar Herramientas**

1. **Consola del Navegador (F12 → Console)**
   - Busca errores rojos: `Cannot read property 'id' of undefined`
   - CORS errors, 404s, referencias indefinidas

2. **Pestaña Network (F12 → Network)**
   - ¿Se carga el `.glb`? ¿Responde 200 o 404?
   - ¿La petición POST a `/api/leads` devuelve éxito?

3. **React DevTools**
   - Inspecciona el estado en el `ExperienceProvider`: ¿Tiene el `currentProject` correcto?
   - ¿Los selectores (`useSelector`) devuelven los valores esperados?

4. **Performance (F12 → Performance)**
   - Graba una interacción, busca picos en "Scripting" o "Rendering"
   - ¿Hay memory leaks? Observa el uso de RAM

5. **VS Code Debugger**
   - Añade `debugger;` en el código
   - Abre VS Code Debugger: `F5`
   - Recorre línea por línea

### **Paso 4: Formular Hipótesis**

Basado en los datos recopilados, crea una teoría:
```
Hipótesis: "El contador de interacciones (`INCREMENT_CLICK`) se registra (confirmado en React DevTools),
pero NarrativeOverlay no se re-renderiza porque está dentro de AnimatePresence
y la `key` no está cambiando correctamente, creando un 'glitch' visual."
```

### **Paso 5: Probar y Verificar**

Diseña un experimento simple:
```typescript
// Añade este console.log dentro del componente NarrativeOverlay
const clickCount = useSelector(state => state.clickCount);
console.log('NarrativeOverlay renderizado con clickCount:', clickCount);

// Si el log aparece → el componente se re-renderiza
// Si NO aparece → el componente no se actualiza (confirma hipótesis)
```

### **Paso 6: Implementar y Documentar**

Aplica la solución mínima y documenta el "porqué":

```tsx
// ANTES (posible problema)
return <AnimatePresence>{isNarrativeComplete ? <CTA /> : null}</AnimatePresence>;

// DESPUÉS (solución)
// Se añadió key="cta" para que AnimatePresence detecte cambios
// y mode="wait" para una transición más limpia.
return (
  <AnimatePresence mode="wait">
    {step === 3 && <CTA key="cta" />}
  </AnimatePresence>
);

// Nota: Las keys son críticas en AnimatePresence para triggear transiciones
```

---

## 🚨 Escenarios Comunes y Soluciones

### **Escenario 1: Modelo 3D No Aparece**

**Síntomas:**
- Pantalla negra, pero el título y UI sí cargan
- No hay errores en la consola

**Diagnóstico:**
```
1. Pestaña Network → Busca petición de "TORO.glb"
   ✅ Devuelve 200 → archivo existe
   ❌ Devuelve 404 → ruta incorrecta

2. React DevTools → Inspecciona <DynamicModel>
   ✅ scene prop tiene contenido → useGLTF funcionó
   ❌ scene es undefined → error en loading
```

**Soluciones Comunes:**
- **Ruta incorrecta:** Verifica `/public/models/glb/` existe exactamente
- **Archivo corrupto:** Abre `.glb` en https://gltf-report.dev
- **useGLTF falla:** Asegúrate de que <Suspense> envuelve el componente

---

### **Escenario 2: Rendimiento Pobre (FPS Bajo)**

**Síntomas:**
- Animaciones bruscas al rotar o cambiar de proyecto
- FPS cae por debajo de 60

**Diagnóstico:**
```
1. F12 → Performance → Graba 5 segundos de interacción
   Busca picos en "Scripting" o "Rendering"

2. Inspecciona el modelo en Three.js Inspector
   ¿Cuántos polígonos? ¿Texturas de qué tamaño?
```

**Soluciones:**
- **Comprimir GLB:** Usar DRACO compression
- **Reducir polígonos:** Exportar desde Blender con decimation
- **Optimizar sombras:** Reducir `shadow-mapSize` en `directionalLight`
- **Memoizar:** Usar `React.memo` en `ProjectGallery` para evitar re-renders

---

### **Escenario 3: Estado No Sincroniza**

**Síntomas:**
- Haces clic pero la narrativa no avanza
- Cambias de proyecto en galería pero modelo anterior sigue visible

**Diagnóstico:**
```
1. React DevTools → Pestaña "Components"
   Inspecciona <NarrativeOverlay>
   ¿La prop `step` es la correcta?

2. Consola → Añade:
   console.log('clickCount:', clickCount);
   console.log('dispatch llamado:', true);
```

**Soluciones:**
- **Mutación directa:** No hagas `state.clickCount++`; usa siempre setter o dispatch
- **Hook mal usado:** `useExperienceState()` debe estar dentro de un `ExperienceProvider`.
- **AnimatePresence key:** Asegúrate que cada elemento tenga `key` única

---

### **Escenario 4: Deploy en Vercel Falla**

**Síntomas:**
- Push a GitHub funciona, pero Vercel da error de build

**Diagnóstico:**
```
1. Vercel Dashboard → Tu proyecto → Logs
   ¿Qué línea exacta falla?

2. Build local:
   npm run build
   ¿Mismo error? Problema es tuyo, no de Vercel
```

**Soluciones Comunes:**
- **Variable de entorno faltante:** Añade en Vercel Settings → Environment
- **Error de TypeScript:** `npm run lint` te lo dirá
- **Dependencia sin instalar:** `npm install` está desactualizado

---

## 🛠️ Herramientas Esenciales (Referencia Rápida)

| Herramienta | Uso | Atajo |
|---|---|---|
| **VS Code** | Edición, debug de código | `F5` inicia debugger |
| **Browser DevTools** | Inspeccionar todo | `F12` |
| **React DevTools** | Estado de componentes | Tab "Components" |
| **Three.js Inspector** | Escena 3D | Extensión Chrome |
| **Vercel Dashboard** | Logs, deployment | `vercel.com` |
| **Network Tab** | Requests/responses | `F12` → Network |

---

## 💡 Prevención de Bugs Futuros

Escribe código que minimice errores desde el inicio:

1. **Tipado Estricto:** Nunca uses `any`. Si TypeScript se queja, escúchalo.
2. **Funciones Puras:** Una entrada, una salida. Sin efectos secundarios.
3. **Estado Predecible:** El estado fluye en una sola dirección.
4. **Componentes Pequeños:** Cada componente hace UNA cosa.
5. **Comentarios Intencionados:** Explica el "porqué", no el "qué".

---

## 📋 Checklist de Debugging

Usa este checklist cada vez que investigues un bug:

- [ ] **Reproducir error consistentemente**
  - Anota exactamente los pasos para activarlo

- [ ] **Identificar área específica**
  - ¿Es 3D, estado, API, o build?

- [ ] **Usar herramientas adecuadas**
  - DevTools, React DevTools, logs

- [ ] **Formular hipótesis clara**
  - Una teoría testeable

- [ ] **Diseñar experimento simple**
  - Un `console.log` o variable de debug

- [ ] **Aplicar solución mínima**
  - Solo lo necesario para fijar

- [ ] **Documentar para futuro**
  - Comentario en el código explicando porqué

---

## 🎯 Conclusión

Debugging en RUMORR es restaurar la magia. Cada error resuelto te hace un mejor arquitecto de experiencias digitales. Sé metódico, confía en los datos y recuerda: **cada bug es una oportunidad para perfeccionar el universo**.

Ahora, ve y restaura la experiencia. 🚀
