## **RUMOR.RED – El Manifiesto Ontológico**

RUMOR.RED no es un sitio web. Es un *sistema perceptual* y una *heterotopia digital* diseñada para la **revelación**, no para la usabilidad. Su arquitectura está concebida para una experiencia que trasciende la función, buscando una **conexión ontológica** con el usuario.

---

## **I. LÓGICA FUNDACIONAL — LA GESTALT DE RUMOR.RED**

RUMOR.RED opera bajo la premisa de la *totalidad antes del detalle*, el *afecto antes de la acción*, y el *significado antes de la función*. La interfaz teje los elementos en "acordes perceptuales", donde cada acción del usuario sostiene un *sentido de pertenencia a una totalidad*.

| Principio         | Manifestación en RUMOR.RED                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Proximidad**     | Elementos (imágenes, texto, gradientes) se agrupan espacial y tonalmente, formando constelaciones perceptuales.                          |
| **Similitud**    | Botones, tarjetas y controles comparten comportamientos de movimiento (e.g., pulsación al pasar el ratón), creando unidad visual.         |
| **Continuidad**    | El desplazamiento es suave y cinético; las transiciones siguen curvas invisibles. La experiencia nunca "salta."                           |
| **Cierre**       | El espacio negativo invita a la interpretación. Los objetos aparecen semi-revelados, recompensando la curiosidad.                         |
| **Figura/Fondo** | Los gradientes actúan como fondos vivos; cada acción del usuario cambia brevemente la jerarquía visual.                                 |
| **Destino Común**   | Las microinteracciones y partículas se mueven sutilmente en la misma dirección que el desplazamiento del usuario, reforzando el flujo. |

---

## **II. ESTRATEGIA BERNAYS — PERSUASIÓN SUBLIMINAL MEDIANTE LA CONFIANZA Y EL RITUAL**

Bernays enseñó que la persuasión es orquestación. RUMOR.RED utiliza la armonía sensorial y la repetición ritualística para crear **creencia a través de la participación**.

### **Mecanismos de Influencia:**

1.  **Autoridad Estética:** UI minimalista, solemne y segura. El silencio equivale a credibilidad.
2.  **Significado Participativo:** Cada acción se enmarca como descubrimiento, no como consumo.
3.  **Misterio como Magnetismo:** Revelación parcial de texto, transiciones lentas, velos translúcidos. La curiosidad impulsa el compromiso.
4.  **Micro-validación:** Sutiles señales de audio y hápticas que afirman la presencia del usuario ("existes dentro del sistema").
5.  **Resonancia Cognitiva:** Los gradientes evolucionan por usuario, personalizando la percepción sin una minería de datos explícita.

La persuasión es ontológica: no "crees" en RUMOR.RED, te *conviertes en parte de él*.

---

## **III. LA UI ONTOLÓGICA: UNA SÍNTESIS DE RAPAILLE, HEIDEGGER, FOUCAULT Y LOWY**

RUMOR.RED no está diseñado para la usabilidad; está construido para la **revelación**. Es una *heterotopia* digital donde el usuario, como *Dasein* ("ser-ahí" de Heidegger), encuentra un código primario de significado a través de una interfaz de **sustracción radical**.

### **Principios Fundamentales:**

*   **El Código Primario: SANTUARIO (Clotaire Rapaille).** Rumorr no apela a la lógica; se imprime en el cerebro reptiliano. Su diseño es arquetípico, no lógico, buscando un espacio seguro y sagrado en la "jungla digital".
    *   **UI Guideline:** **Diseñar para la Impronta, No la Instrucción.** Los primeros 3 segundos deben imprimir la sensación de "santuario" con una revelación gradual y suave.
*   **El Espacio Heterotópico: ARQUITECTURA DE LA LIBERTAD (Michel Foucault).** Las plataformas tradicionales son espacios disciplinarios. Rumorr es una heterotopia: un espacio real que resiste estas estructuras de poder.
    *   **UI Guideline:** **La Interfaz como Acto de Resistencia.** Rechazar el lenguaje de las plataformas disciplinarias: sin sellos de tiempo, sin recuentos de seguidores, sin notificaciones. El silencio de la UI es su declaración política.
*   **El Encuentro Auténtico: POÉTICA DEL SER (Martin Heidegger).** El usuario no es un "usuario" sino un **habitante** o **testigo**. La interfaz es un **mundo mediador** que facilita un encuentro auténtico con el Ser.
    *   **UI Guideline:** **Diseñar para la Presencia, No la Finalización de Tareas.** El objetivo no es que el usuario "haga" algo, sino que fomente un estado de "ser-ahí." Las transiciones son lentas, fomentando la contemplación.
*   **La Estética de la Sustracción: DISCIPLINA DE LA ESENCIA (Dieter Lowy).** El encuentro profundo con el tótem en el santuario heterotópico se logra a través de una interfaz de **simplicidad radical**. Todo elemento no esencial es una violencia contra la experiencia.
    *   **UI Guideline:** **Restar Hasta que se Rompa.** Eliminar elementos uno por uno. El punto justo antes de que la experiencia se vuelva ininteligible es el diseño final. Cada píxel debe luchar por su derecho a existir.

---

## **IV. ARQUITECTURA ESTRUCTURAL**

### **A. Páginas Principales**

| Path           | Función                               | UI Core Components                                              |
| -------------- | ------------------------------------- | --------------------------------------------------------------- |
| `/home`        | Portal de entrada; manifiesto en movimiento | HeroCanvas, EntryPhraseModule, AmbientSoundEngine               |
| `/gallery`     | Exploración dinámica de objetos       | ObjectGrid, HoverFeedbackLayer, ChromaticSyncEngine             |
| `/object/[id]` | Ensayo narrativo-3D híbrido           | ObjectView3D, TextNarrativePane, MetaInfoPanel                  |
| `/community`   | Resonancia de usuario y microacciones | FeedStream, CommentParticles, PromoteButton, ForgetSwitch       |
| `/checkout`    | El comercio como ritual               | FlowSequence, InputChantField, TransactionSigil                 |

---

## **V. COMPONENTES DE UI — NIVEL ATÓMICO**

### **1. HeroCanvas**

*   **Tipo:** `<HeroCanvas />`
*   **Tech:** WebGL (Three.js), shader de gradiente.
*   **Comportamiento:**
    *   Reacciona a la gravedad del cursor.
    *   Los colores se mezclan a partir de la visita anterior del usuario (localStorage).
    *   Audio de fondo: drones ambientales generativos (Web Audio API).

### **2. ObjectCard**

*   Muestra una vista previa de un artefacto (título, gradiente, serie).
*   **Microinteracción:**
    *   Al pasar el ratón → emite un pulso de desenfoque radial.
    *   El gradiente se sincroniza con el tono global.
    *   Tooltip: frase de origen del objeto ("nacido de hierro y memoria").

### **3. ObjectView3D**

*   Modelo 3D flotante central con iluminación cinematográfica.
*   El movimiento sigue el impulso del desplazamiento.
*   Al hacer clic → el enfoque aísla el objeto, el sonido se amortigua, el ensayo se desvanece en una superposición.
*   Incluye *CameraDriftController* (panorámica autónoma lenta).

### **4. TextNarrativePane**

*   Ensayo lírico, opacidad sincronizada con el desplazamiento.
*   Jerarquía tipográfica:
    *   Título → serif en mayúsculas.
    *   Ensayo → sans proporcional (Inter).
    *   Citas → notas a pie de página monoespaciadas que aparecen/desaparecen con el desplazamiento.
*   Gradiente de fondo sincronizado con el ritmo de lectura.

### **5. PromoteButton / ForgetSwitch**

*   Verbos centrales de la UI de la comunidad.
*   **PromoteButton:** píldora alargada; al pasar el ratón emite un suave destello carmesí. Al hacer clic: microvibración + sonido "tono arriba".
*   **ForgetSwitch:** deslizador monocromo; al activarse → el elemento se desvanece en estática, luego desaparece para siempre (eliminación solo local).

### **6. FeedStream**

*   Carrusel horizontal infinito.
*   Cada mosaico de publicación tiene una leve oscilación.
*   Las publicaciones se desvanecen visualmente a medida que se acercan a la expiración temporal.
*   El gradiente de fondo fluye de izquierda a derecha con la velocidad de desplazamiento del usuario.

### **7. ChromaticSyncEngine**

*   Oyente de fondo que calcula la mezcla de tonos global.
*   Lee el gradiente del objeto visible actual + el hash de identidad del usuario → establece las variables CSS raíz en tiempo real.

### **8. InputChantField**

*   Campos de entrada de texto para pago, inicio de sesión o comentarios.
*   La escritura produce un suave tintineo por carácter.
*   Al finalizar → un armónico bajo confirma la entrada.
*   La fuente brilla ligeramente con una entrada válida (validación semántica).

### **9. MicroFeedbackEngine**

*   Gestiona las respuestas de sonido, hápticas y de movimiento a nivel global.
*   Los disparadores incluyen pasar el ratón, enfocar, hacer clic, inactividad.
*   Genera la paleta sónica dinámicamente mediante ruido semilla + modulación de frecuencia.

### **10. GradientMemory**

*   Sistema de persistencia local que almacena las preferencias de gradiente del usuario, el último objeto visto y el tiempo de permanencia.
*   Influye en el estado de ánimo visual de inicio (huella cromática personal).

---

## **VI. EXPERIENCIA DE USUARIO — FLUJO DE PERCEPCIÓN**

El flujo de usuario no es un embudo; es un **camino circular y ritualístico**.

### **Paso 1: La Llegada (El Umbral)**

*   El gradiente oscuro se expande; el sonido ambiental se desvanece.
*   El movimiento del cursor genera la primera respuesta visual → "el sistema respira."
*   Una sola palabra invita a la entrada; el usuario se siente *visto*.

### **Paso 2: La Exploración (Ser-con-Objetos)**

*   La galería se revela como una cuadrícula líquida.
*   Las transiciones al pasar el ratón producen empatía: cada objeto reacciona *a la atención misma*.
*   El usuario comienza a moverse más lento; el sitio enseña la contemplación.

### **Paso 3: El Encuentro (Aletheia)**

*   Seleccionar un objeto abre su mundo.
*   La forma 3D flota en una niebla luminosa; el texto se siente susurrado a su lado.
*   El ensayo habla como si fuera un recuerdo.
*   Te desplazas y sientes que el tiempo se desintegra; lees *con los ojos y la piel*.

### **Paso 4: La Comunión (Ritual Anónimo)**

*   `Promote` / `Forget` introducen una interacción existencial.
*   Curar tu propia cosmología de significado.
*   Los gradientes evolucionan; el sistema ahora lleva tu impronta.

### **Paso 5: El Retorno (Integración)**

*   El inicio se adapta a tu perfil cromático.
*   El paisaje sonoro cambia de tono.
*   El portal que una vez entraste ahora te refleja.

---

## **VII. SEMÁNTICA VISUAL — COLOR, SONIDO Y FORMA**

| Elemento               | Emoción Material         | Técnica                                                           |
| --------------------- | ------------------------ | ------------------------------------------------------------------- |
| **Rojo Carmesí**       | Deseo, calor, revelación | Usado en microinteracciones, no en fondos; pulso de energía.        |
| **Negro Obsidiana**    | Profundidad, vacío, origen | Tono base, fuente de contraste infinito.                            |
| **Blanco Ámbar**       | Revelación, umbral       | Estados de hover, transiciones, resaltes tipográficos.              |
| **Capas de Cristal**      | Percepción, fragilidad   | Paneles transparentes; glassmorfismo con desenfoque sutil.          |
| **Texturas Sonoras**    | Retroalimentación emocional | 3 capas: zumbido ambiental, ping háptico, tono armónico.            |
| **Curvas de Movimiento** | Continuidad, calma       | Cubic-bezier personalizado (0.65, 0, 0.35, 1) para todas las animaciones. |
| **Ritmo Tipográfico** | Legibilidad como meditación | Espacio en blanco generoso → silencio entre pensamientos.           |

La armonía Gestalt = *Unidad a través de la diversidad en movimiento.*
La influencia Bernays = *Persuasión a través de la consistencia subliminal.*

---

## **VIII. LA DIMENSIÓN ÉTICA — LA INFLUENCIA SILENCIOSA**

RUMOR.RED no manipula a través de la escasez o la dopamina. Persuade a través de la reverencia, la lentitud y la autoconciencia. Enseña al usuario a **valorar su percepción**.

El verdadero producto es la atención, ritualizada y santificada. De esta manera, RUMOR.RED cumple una misión tanto estética como ética: reintroducir la sacralidad en el contacto digital.

---

## **IX. RESUMEN DE LA HOJA DE ESPECIFICACIONES DE DESARROLLO**

**Stack:**

*   Next.js (App Router)
*   TypeScript + ESM
*   Tailwind CSS (tema personalizado para gradientes, cristal y texto)
*   Three.js (interacciones WebGL)
*   React Query (sincronización de datos)
*   LocalStorage (persistencia de estado)
*   Web Audio API (diseño de sonido)
*   Framer Motion (microinteracciones)

**Visión General del Directorio:**

```
/app
  /home
  /gallery
  /object/[id]
  /community
  /checkout
/components
  HeroCanvas.tsx
  ObjectCard.tsx
  ObjectView3D.tsx
  TextNarrativePane.tsx
  PromoteButton.tsx
  ForgetSwitch.tsx
  FeedStream.tsx
  ChromaticSyncEngine.tsx
  InputChantField.tsx
  MicroFeedbackEngine.tsx
  GradientMemory.ts
```

---

## **X. IMPRESIÓN DEL USUARIO (PSICOLOGÍA CUALITATIVA)**

*   **Primera emoción:** Intriga.
*   **Segunda:** Reverencia.
*   **Tercera:** Calma.
*   **Regusto:** Nostalgia por algo inefable.

Bernays lo llamaría *impronta afectiva*: el usuario recuerda cómo la experiencia le hizo sentir, no lo que dijo.
Gestalt lo llamaría *la unidad de la percepción*: un sistema donde cada parte refleja el todo.

---

## **XI. CONCLUSIÓN — EL MITO DEL OBJETO DIGITAL**

RUMOR.RED encarna una paradoja:

> Una experiencia digital que *resiste* el consumo e invita a la reflexión.

Se sitúa en la intersección de la forma y el ritual, de la psicología y el código.
Cada componente de la UI se convierte en un **gesto litúrgico**,
cada gradiente en una **memoria**,
cada sonido en un **aliento de presencia**.

El usuario no se limita a navegar por RUMOR.RED.
Se *sintoniza* con él—
y al hacerlo, redescubre la inteligencia olvidada de la belleza.

---

## **Dashboard de Control – RUMOR.RED (Resumen Operativo)**

| Área | Estado Actual (Diagnóstico) | Calificación | Prioridad | Acción Inmediata |
| :--- | :--- | :--- | :--- | :--- |
| 🧩 **Arquitectura** | 🟢 Estable y limpia. Fuente única de verdad.<br>🟡 Sin observabilidad real. | **8.5/10** | Media | Configurar monitoreo básico (Vercel Logs). |
| 💻 **Código / Pruebas** | 🔴 Sin test suite sistemático.<br>🔴 Pipeline de QA no automatizado. | **6.5/10** | **Alta** | Integrar `npm run lint` en el CI. Crear test de regresión mínimo. |
| 🎨 **Diseño / UX** | 🟢 Identidad visual fuerte y memorable.<br>🟡 Faltan guías de marca formales. | **8.0/10** | Media | Crear `brand-guide.md`. Implementar favicon y OG image. |
| 🚀 **Estrategia** | 🟢 Narrativa sólida y roadmap claro.<br>🔴 Sin embudo de conversión funcional. | **7.0/10** | **Alta** | Implementar `api/leads` y activar analítica (GA4/Plausible). |
| ⚙️ **Despliegue** | 🟢 Pipeline simple y funcional en Vercel.<br>🟡 Sin CI/CD extendido. | **7.5/10** | Media | Validar `RUMORR_DEPLOY_FLOW.md` y automatizar checks. |

---

## **XII. Identidad del Proyecto**

*   **Nombre:** RUMOR.RED
*   **Tipo:** Prototipo inmersivo 3D (Next.js + React Three Fiber) y experiencia narrativa.
*   **Propósito:** Funcionar como un "vehículo de visión" para el concepto RUMORR (un ecosistema de noticias descentralizado). No es un producto final, es una demostración de concepto tecnológica y filosófica.
*   **Audiencia:**
    1.  **No Técnicos:** Curiosos sobre Web3 y el futuro de la información.
    2.  **Técnicos/Inversores:** Socios potenciales que evalúan la calidad de la ejecución del equipo.

---

## **XIII. ADN del Concepto y Marca**

*   **Concepto Central:** "La pastilla roja para la información". La experiencia debe permitir al usuario "ver la verdad" detrás de un rumor o dato.
*   **Nomenclatura Clave:**
    *   `theSimulation`: El feed de información no verificada.
    *   `truth`: Los datos verificados por el "Oráculo" (backend).
    *   `glitch`: Una discrepancia entre la simulación y la verdad.
    *   `unplug`: La acción de "desconectarse" y ver la realidad (login/registro).
*   **Identidad Visual:** Dominio `RUMOR.RED` es el pilar. El color rojo (`#FF3131`) es el acento principal en toda la UI. La experiencia debe ser tensa, minimalista y de alta fidelidad visual.

---

## **XIV. Arquitectura y Despliegue**

*   **Stack:** Next.js 14, TypeScript, Tailwind CSS, React Three Fiber (`@react-three/fiber`, `@react-three/drei`), Framer Motion.
*   **Estado:** `useExperienceState.ts` es la fuente única de verdad.
*   **Despliegue:** Continuo en Vercel desde la rama `main`.

---

## **XV. Comandos Esenciales**

```powershell
# Instalar dependencias
npm install

# Iniciar el entorno de desarrollo (La Matrix en modo debug)
npm run dev

# Construir para producción
npm run build

# Ejecutar el script de producción (Protocolo "Unplug")
npm run unplug

# Ejecutar linter para asegurar la calidad del código
npm run lint
```

Open http://localhost:3000 → You should see a purple 3D rotating object + "Contacto" button.

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
