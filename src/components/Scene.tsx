reactimport { Canvas } from '@react-three/fiber'; // El lienzo donde se revela la realidad 3D
import { Suspense, memo, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, MotionConfig, Transition } from 'framer-motion';
import * as THREE from 'three';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { DynamicModel } from './DynamicModel';
import { NarrativeOverlay } from './NarrativeOverlay'; // El TextNarrativePane
import { ProjectGallery } from './ProjectGallery';
import { FloatingCTA } from './FloatingCTA';
import { useExperienceState as useMatrix } from '@/hooks/useExperienceState'; // Alias for conceptual alignment

/**
 * OracleSyncLoader: A visually distinct loading component, representing the system
 * buffering reality while syncing with The Oracle.
 * Refleja la "Llegada" y el "Umbral" de la experiencia. */
const OracleSyncLoader = memo(() => (
  <motion.div
    className="flex items-center justify-center w-full h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } }}
    exit={{ opacity: 0, transition: { duration: 1, ease: 'easeOut' } }}
  >
    <div className="text-white text-3xl font-extralight tracking-[0.5em]">RUMOR.RED</div>
  </motion.div>
));

OracleSyncLoader.displayName = 'OracleSyncLoader';

/**
 * SimulationCore: Contains the core 3D elements of the simulation (The Matrix).
 * This component is memoized to prevent re-renders when only UI state changes,
 * representando una capa estable de la realidad simulada. Es el "ObjectView3D".
 */
const Main3DScene = memo(() => {
  const { dispatch } = useMatrix(); // El dispatch para las interacciones del usuario

  return (
    <>
      {/* --- ILUMINACIÓN --- */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048} // Calidad de sombra para Autoridad Estética
        shadow-mapSize-height={2048} // Calidad de sombra para Autoridad Estética
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFA500" />

      {/* --- MODELO Y ENTORNO --- */}
      <Suspense fallback={null}>
        <DynamicModel onInteraction={() => dispatch({ type: 'INCREMENT_CLICK' })} />
        <Environment preset="sunset" background={false} />
      </Suspense>

      {/* --- SOMBRAS Y CONTROLES --- */}
      <ContactShadows frames={1} position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} /> {/* Sombras de contacto para anclar el objeto (Gestalt: Figura/Fondo) */}
      <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={10} />
    </>
  );
});

Main3DScene.displayName = 'Main3DScene';

/**
 * TheMatrix: The main component that orchestrates the entire simulated experience,
 * deciding whether to show the loading state (syncing) or the simulation itself.
 * Es el "HeroCanvas" y el orquestador de la "Experiencia de Usuario - Flujo de Percepción". */
function TheMatrix() {
  const { state, loadProject } = useMatrix();

  useEffect(() => {
    // Initial connection to The Oracle to load the first simulation.
    if (!state.currentProject && !state.isLoading) {
      void loadProject(state.currentProjectId);
    }
  }, [loadProject, state.currentProject, state.isLoading, state.currentProjectId]);

  // The visual "hue" of the current simulation, derived from its state (the "glitch" or "truth" color scheme).
  const simulationHues = useMemo(() => {
    const projectGradient = state.currentProject?.gradient; // Gradiente como "Memoria" y "Resonancia Cognitiva" (Bernays)
    if (!projectGradient) return 'from-gray-900 to-black';
    return `${projectGradient[state.phase] || 'from-gray-900 to-black'}`;
  }, [state.currentProject, state.phase]);

  const canvasTransition: Transition = { duration: 0.75, ease: 'easeInOut' };

  return (
    <MotionConfig transition={canvasTransition}>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {/* Is the user plugged in? Or are we syncing with reality? */}
          {!state.currentProject ? (
            // Awaiting sync with The Oracle.
            <motion.div key="loader"> {/* Transición de "La Llegada" (Heidegger) */}
              {/* B. Auditoría del <body> - 9. Estado de Carga (Loading Skeleton) */}
              {/* OracleSyncLoader ya proporciona un feedback visual */}
              <OracleSyncLoader />
            </motion.div>
          ) : (
            // Rendering the Matrix simulation.
            <motion.div key="scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Canvas // El lienzo 3D, el corazón de la experiencia
                shadows // Habilitamos las sombras correctamente
                // B. Auditoría del <body> - 10. Canvas con Atributos Correctos
                data-testid="rumor-red-canvas"
                aria-label="Modelo 3D interactivo de RUMOR.RED"
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
                onCreated={({ gl, scene }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  scene.background = null;
                }}
              >
                <Main3DScene />
              </Canvas>
              <div
                className={`absolute inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-br ${simulationHues}`} // Gradientes como "fondos vivos" (Gestalt: Figura/Fondo)
                style={{ opacity: 0.3 }}
              />
              <ProjectGallery />
              <NarrativeOverlay />
              <FloatingCTA />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export const Scene = memo(TheMatrix);
Scene.displayName = 'Scene';
