// src/lib/GradientEngine.ts
// Un hash simple pero efectivo para generar semillas determinísticas, clave para "Color como Memoria" (Heidegger) y "Resonancia Cognitiva" (Bernays).
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// La paleta de colores del Sistema Estético Rumorr, reflejando "Semántica Visual" (Lowy).
const RUMORR_PALETTE = ['#CBA6F7', '#91E0D6', '#FFCB6B', '#E36464'];

export const generateDeterministicGradient = (seed: string): string => {
  const hash = simpleHash(seed);
  const angle = hash % 360; // Ángulo del gradiente para diversidad visual
  const color1Index = hash % RUMORR_PALETTE.length;
  const color2Index = (hash + 1) % RUMORR_PALETTE.length;
  const noiseColor = 'rgba(255, 255, 255, 0.02)'; // Ruido sutil para dar textura, contribuyendo a la "Autoridad Estética" (Bernays).

  return `linear-gradient(${angle}deg, ${RUMORR_PALETTE[color1Index]}, ${noiseColor}, ${RUMORR_PALETTE[color2Index]})`;
};