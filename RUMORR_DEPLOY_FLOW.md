# RUMOR.RED – Protocolo de Transmisión y Flujo de Despliegue

## 1️⃣ Arquitectura General y Flujo de la Simulación

```mermaid
flowchart TD
    Usuario[Usuario]
    UIUX[UI/UX Layer\nTítulo animado, FAB, NarrativeOverlay, FloatingCTA]
    Interaccion3D[Interacción 3D\nAutoGLB, Hover/Click, Glow, Rotación, Escalado]
    EstadoGlobal[Estado Global\nuseExperienceState, React Context]
    APILeads[API / Leads\nPOST /api/leads.ts, data/leads.json o DB futura]
    Metricas[Métricas & Logs\nMonitorización Vercel, Analítica interna, UTMs]

    Usuario --> UIUX --> Interaccion3D --> EstadoGlobal --> APILeads --> Metricas
```

---

## 2️⃣ Protocolo Operativo de Deploy

```mermaid
flowchart LR
    subgraph Predeploy
        A1[Limpieza código]
        A2[Optimización assets]
        A3[Build y validación]
    end
    subgraph Deploy
        B1[Deploy Vercel]
        B2[Variables entorno]
        B3[Smoke test]
    end
    subgraph Postdeploy
        C1[Logs y leads]
        C2[Métricas usuario]
        C3[Iteración rápida]
    end
    subgraph Evolución
        D1[Leads a DB]
        D2[AB Testing]
        D3[AR/VR]
        D4[CI/CD]
    end
    Predeploy --> Deploy --> Postdeploy --> Evolución
```

---

## 3️⃣ Flujo Visual Operativo

```mermaid
sequenceDiagram
    participant U as Usuario
    participant C as Canvas 3D
    participant N as NarrativeOverlay
    participant F as FloatingCTA
    participant A as API Leads
    participant M as Métricas

    U->>C: Hover/Click 3D
    C->>N: advance()
    N->>F: Mostrar CTA final
    F->>A: POST lead
    A->>M: Registrar métrica
    M->>U: Feedback/Iteración
```

---

## 4️⃣ Checklist de Deploy Diario

- [ ] Limpieza de código + assets optimizados
- [ ] Build local exitoso
- [ ] Variables de entorno configuradas
- [ ] Deploy Vercel
- [ ] Smoke Test: 3D, hover, click, CTA
- [ ] Logs revisados, leads validados
- [ ] Iteración rápida aplicada si falla algo

---

**Este documento sirve como guía visual y técnica para el equipo RUMORR: desde el flujo de usuario hasta el deploy y la evolución futura.**
