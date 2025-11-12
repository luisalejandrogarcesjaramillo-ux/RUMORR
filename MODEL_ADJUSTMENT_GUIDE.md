# Ajuste de Escala: ENSAYO1.glb 🎯

## Problema Típico
Tu modelo `.glb` llega con escala incorrecta (demasiado grande, demasiado pequeño, de lado, etc).

## Solución: Protocolo de 3 Pasos

### ✅ Paso 1: Verificar Tamaño (Hecho)
- ENSAYO1.glb: 1.6 MB ✅ (Dentro de 3MB ideal)
- Ubicación: `public/models/glb/ENSAYO1.glb` ✅

### ✅ Paso 2: Código Base (Hecho)
El archivo `components/EpicModel.tsx` permite ajuste sin tocar `Scene.tsx`:

```tsx
<EpicModel
  modelUrl="/models/glb/ENSAYO1.glb"
  scale={[1, 1, 1]}        // ← AJUSTA AQUÍ
  position={[0, 0, 0]}     // ← O AQUÍ
  rotation={[0, 0, 0]}     // ← O AQUÍ
/>
```

### 📝 Paso 3: Iteración Rápida

**Instrucciones:**
1. Abre http://localhost:3000 (hard refresh: Ctrl+Shift+R)
2. Abre `components/EpicModel.tsx` en el editor
3. Cambia `scale` y guarda (el servidor auto-refresca)

**Pruebas:**

| Problema | Solución |
|----------|----------|
| Modelo NO VISIBLE | Aumenta `scale`: `[2,2,2]` o `[5,5,5]` |
| Modelo MINÚSCULO | Aumenta más: `[10,10,10]` |
| Modelo GIGANTE (ocupa toda pantalla) | Reduce: `[0.5,0.5,0.5]` o `[0.1,0.1,0.1]` |
| Modelo ROTADO/DE LADO | Cambia `rotation`: `[Math.PI,0,0]` o `[0,Math.PI,0]` |
| Modelo FLOTANDO ARRIBA/ABAJO | Cambia `position`: `[0,-1,0]` o `[0,1,0]` |

**Ejemplo de ajuste:**
```tsx
// Si el modelo se ve pequeño:
scale={[2, 2, 2]}  // 2x más grande

// Si está de lado:
rotation={[0, Math.PI, 0]}  // Giro 180° en Y

// Si está flotando:
position={[0, -0.5, 0]}  // Baja 0.5 unidades
```

## Debugging: Console Inspection

1. Abre F12 → Console
2. Copia-pega:
```javascript
fetch('/models/glb/ENSAYO1.glb')
  .then(r => r.blob())
  .then(b => console.log(`Model size: ${(b.size / 1024 / 1024).toFixed(2)} MB`))
```

Debería imprimir: `Model size: 1.60 MB` ✅

## FPS Check

- Mira esquina superior derecha del navegador
- Debería ver FPS > 50 (desktop) o > 30 (mobile)
- Si FPS cae, el modelo es demasiado complejo (H7 DRACO)

## Éxito: Checklist

- [ ] Modelo visible en pantalla
- [ ] Puedo rotarlo con mouse (OrbitControls)
- [ ] FPS estables > 50
- [ ] Botón "Contacto" visible y clickeable
- [ ] Console sin errores rojos

Una vez todo ✅, guarda el archivo y reporta:
```
✅ Escala ajustada a [X, Y, Z]
✅ Posición: [X, Y, Z]
✅ Rotación: [X, Y, Z]
✅ FPS: XX
```
