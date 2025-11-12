# 🧱 Cuestionario de Solidez Arquitectónica – Proyecto RUMORR

**Instrucciones:** Evalúa cada punto en una escala de 0 (muy deficiente) a 5 (excelente). Anota el puntaje en `(__/5)`.

---

### I. Estructura General y Arquitectura

- [ ] **1.1:** ¿El proyecto mantiene una fuente única de verdad para el estado global (`useExperienceState`)? `(__/5)`
- [ ] **1.2:** ¿Existen módulos redundantes o hooks que dupliquen lógicas? `(__/5)`
- [ ] **1.3:** ¿Cada módulo cumple una única responsabilidad (Single Responsibility Principle)? `(__/5)`
- [ ] **1.4:** ¿Las dependencias entre módulos son claras, unidireccionales y puras (sin efectos secundarios ocultos)? `(__/5)`
- [ ] **1.5:** ¿Se mantienen las rutas de archivos coherentes y predecibles (`/src/hooks`, `/src/components`, etc.)? `(__/5)`
- [ ] **1.6:** ¿El código es 100% TypeScript, sin mezclas de `.js` innecesarios? `(__/5)`
- [ ] **1.7:** ¿El proyecto puede compilarse sin advertencias (`npm run build`) y sin `any` implícitos? `(__/5)`
- [ ] **1.8:** ¿Se ha evitado cualquier lógica de negocio en los componentes de UI? `(__/5)`

**Subtotal I:** ___ / 40

---

### II. Estado y Flujo de Datos

- [ ] **2.1:** ¿Todo el estado global se gestiona en `useExperienceState` y se persiste solo cuando es necesario? `(__/5)`
- [ ] **2.2:** ¿Se mantiene clara la distinción entre estado temporal (UI) y persistente (negocio)? `(__/5)`
- [ ] **2.3:** ¿Las funciones de mutación de estado (reducers/dispatch) son puras y predecibles? `(__/5)`
- [ ] **2.4:** ¿Se evita el uso de `useEffect` con dependencias mal definidas o vacías que puedan causar bucles? `(__/5)`
- [ ] **2.5:** ¿Se usan selectores o hooks derivados para consumir el estado y evitar re-renders innecesarios? `(__/5)`
- [ ] **2.6:** ¿El flujo `acción → estado → UI` mantiene una latencia perceptual inferior a 100ms? `(__/5)`
- [ ] **2.7:** ¿El estado se inicializa correctamente sin condiciones de carrera (race conditions)? `(__/5)`

**Subtotal II:** ___ / 35

---

### III. Componentes y UI

- [ ] **3.1:** ¿Cada componente tiene una única responsabilidad visual o narrativa? `(__/5)`
- [ ] **3.2:** ¿Los componentes están libres de lógica de negocio o manipulación directa del DOM? `(__/5)`
- [ ] **3.3:** ¿Las animaciones y transiciones usan librerías optimizadas (ej. Framer Motion)? `(__/5)`
- [ ] **3.4:** ¿Los estilos visuales (gradientes, colores) son deterministas y están vinculados al estado? `(__/5)`
- [ ] **3.5:** ¿El diseño mantiene la coherencia visual y semántica en Tailwind? `(__/5)`
- [ ] **3.6:** ¿Los componentes 3D (`DynamicModel`) están encapsulados y cargan asíncronamente (`Suspense`)? `(__/5)`
- [ ] **3.7:** ¿Existe un patrón coherente para los CTAs (botones, hovers, narrativas)? `(__/5)`

**Subtotal III:** ___ / 35

---

### IV. Hooks y Lógica Funcional

- [ ] **4.1:** ¿Todos los hooks están autocontenidos, sin dependencias externas no declaradas? `(__/5)`
- [ ] **4.2:** ¿Cada hook devuelve datos y funciones claras, sin mutar variables externas? `(__/5)`
- [ ] **4.3:** ¿El hook `useAnalytics` obtiene su contexto del estado global y no por props? `(__/5)`
- [ ] **4.4:** ¿Se ha eliminado la repetición de funciones de tracking o logging? `(__/5)`
- [ ] **4.5:** ¿Los hooks siguen un patrón de nomenclatura coherente (`useFeatureName`) y están documentados? `(__/5)`

**Subtotal IV:** ___ / 25

---

### V. Seguridad, Rendimiento y Accesibilidad

- [ ] **5.1:** ¿Se validan y sanean correctamente las entradas del usuario? `(__/5)`
- [ ] **5.2:** ¿Las llamadas asíncronas (si existen) usan `try/catch` o `error boundaries` adecuados? `(__/5)`
- [ ] **5.3:** ¿El renderizado inicial mantiene una performance óptima (LCP < 1.5s)? `(__/5)`
- [ ] **5.4:** ¿Se usan claves (`key`) únicas y estables en listas dinámicas? `(__/5)`
- [ ] **5.5:** ¿La aplicación respeta la accesibilidad mínima (contraste, focus states, labels ARIA)? `(__/5)`
- [ ] **5.6:** ¿Se ha minimizado el uso de dependencias de terceros para mantener el control y el peso? `(__/5)`

**Subtotal V:** ___ / 30

---

### VI. Deploy y Mantenimiento

- [ ] **6.1:** ¿El build usa ESM y Node 22+ con `target: "es2020"` en `tsconfig.json`? `(__/5)`
- [ ] **6.2:** ¿El pipeline de deploy (GitHub → Vercel) está libre de pasos manuales? `(__/5)`
- [ ] **6.3:** ¿El `package.json` tiene scripts claros y mínimos (`dev`, `build`, `lint`, `deploy`)? `(__/5)`
- [ ] **6.4:** ¿Se realiza revisión automática de estilo antes de cada commit (pre-commit hook)? `(__/5)`
- [ ] **6.5:** ¿El entorno de desarrollo está optimizado en VSCode con una configuración compartida (`.vscode/settings.json`)? `(__/5)`

**Subtotal VI:** ___ / 25

---

### VII. Escalabilidad y Visión

- [ ] **7.1:** ¿El sistema de tipos (`/src/types`) permite escalar a nuevas entidades sin fricción? `(__/5)`
- [ ] **7.2:** ¿El modelo de datos está preparado para un backend remoto (ej. Supabase) sin refactorización mayor? `(__/5)`
- [ ] **7.3:** ¿La arquitectura soporta un modo offline-first con sincronización eventual? `(__/5)`
- [ ] **7.4:** ¿El proyecto puede extenderse con IA narrativa local sin romper los contratos actuales? `(__/5)`

**Subtotal VII:** ___ / 20

---

### 🏁 Diagnóstico Final

**Puntaje Total:** ___ / 210

**Índice de Solidez Arquitectónica (ISA):** (Puntaje Total / 210) * 100 = **___ %**

| Rango ISA  | Diagnóstico                               |
|------------|-------------------------------------------|
| 90-100%    | **Excepcional.** Arquitectura robusta y preparada para el futuro. |
| 75-89%     | **Sólido.** Fundamentos fuertes con áreas menores de mejora. |
| 60-74%     | **Funcional.** Cumple los requisitos, pero con deuda técnica potencial. |
| < 60%      | **Frágil.** Requiere refactorización antes de escalar. |

**Observaciones y Plan de Acción:**

1.  
2.  
3.  

---