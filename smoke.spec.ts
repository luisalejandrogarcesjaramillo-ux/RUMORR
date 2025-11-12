import { test, expect } from '@playwright/test';

test.describe('Flujo Crítico Unificado - RUMOR.RED', () => {
  test('El habitante puede cargar la experiencia, interactuar y revelar el CTA', async ({ page }) => {
    // --- 1. Carga del Templo ---
    await page.goto('/');

    // Esperar a que la escena 3D (el canvas) esté visible y lista para la interacción.
    const canvas = page.locator('[data-testid="rumor-red-canvas"]');
    await expect(canvas).toBeVisible({ timeout: 10000 }); // Aumentamos el timeout para la carga del modelo

    // --- 2. Interacción y Revelación Narrativa ---

    // Paso 0: Estado inicial
    // La narrativa inicial "Curiosidad" debe estar visible.
    await expect(page.getByText('Curiosidad')).toBeVisible();
    await expect(page.getByText('Un rumor emerge...')).toBeVisible();

    // Paso 1: Primer clic
    // El habitante interactúa con el artefacto.
    await canvas.click({ position: { x: 500, y: 300 } }); // Clic en el centro del canvas
    
    // La narrativa avanza a "Descubrimiento".
    await expect(page.getByText('Descubrimiento')).toBeVisible();
    await expect(page.getByText('La verdad se revela.')).toBeVisible();

    // Paso 2: Segundo clic
    await canvas.click({ position: { x: 500, y: 300 } });

    // La narrativa avanza a "Conexión".
    await expect(page.getByText('Conexión')).toBeVisible();
    await expect(page.getByText('Entiende el impacto.')).toBeVisible();

    // --- 3. Aparición del CTA (Llamada a la Acción) ---

    // Paso 3: Tercer y último clic
    await canvas.click({ position: { x: 500, y: 300 } });

    // La narrativa se completa y el overlay desaparece.
    await expect(page.getByText('Conexión')).not.toBeVisible();

    // El FloatingCTA, que estaba oculto, ahora debe revelarse.
    // Usamos el 'aria-label' que definimos en el componente.
    const ctaButton = page.locator('button[aria-label="Unirse"]');
    await expect(ctaButton).toBeVisible();
  });
});