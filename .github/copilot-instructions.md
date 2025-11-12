# Rumorr MVP — Copilot Instructions

Keep the project minimal and focused on quick 8-hour validation.

## Key Rules

- Do not add external integrations unless explicitly requested
- Replace placeholder 3D assets with production-ready GLTF/GLB files before public launch
- All user data is tracked via `anonId` in `data/leads.json`
- Keep iteration velocity high: prioritize visible impact over code perfection

## Stack

- Next.js + TypeScript
- React Three Fiber for 3D
- Tailwind CSS for UI
- Local JSON storage for MVP (upgrade to Supabase/DB for production)

## Hourly Sprint Structure

H1–H3: Epic 3D + Lights → Narratives + Feedback → UI Polish
H4–H8: Lead Capture + Analytics → Optimization → Vercel Deploy
