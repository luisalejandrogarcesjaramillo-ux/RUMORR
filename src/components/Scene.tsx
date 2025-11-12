import { Canvas } from '@react-three/fiber';
import { Suspense, memo, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import * as THREE from 'three';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { DynamicModel } from './DynamicModel';
import { NarrativeOverlay } from './NarrativeOverlay';
import { ProjectGallery } from './ProjectGallery';
import { FloatingCTA } from './FloatingCTA';
import { useExperienceState as useMatrix } from '@/hooks/useExperienceState'; // Alias for conceptual alignment

/**
 * OracleSyncLoader: A visually distinct loading component, representing the system
 * buffering reality while syncing with The Oracle.
 */
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
 * representing a stable layer of the simulated reality.
 */
const Main3DScene = memo(() => {
  const { dispatch } = useMatrix();

  return (
    <>
      {/* --- ILUMINACIÓN --- */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFA500" />

      {/* --- MODELO Y ENTORNO --- */}
      <Suspense fallback={null}>
        <DynamicModel onInteraction={() => dispatch({ type: 'DETECT_USER_INTERACTION' })} />
        <Environment preset="sunset" background={false} />
      </Suspense>

      {/* --- SOMBRAS Y CONTROLES --- */}
      <ContactShadows frames={1} position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={10} />
    </>
  );
});

Main3DScene.displayName = 'Main3DScene';

/**
 * TheMatrix: The main component that orchestrates the entire simulated experience,
 * deciding whether to show the loading state (syncing) or the simulation itself.
 */
function TheMatrix() {
  const { state, loadProject: loadSimulation } = useMatrix();

  useEffect(() => {
    // Initial connection to The Oracle to load the first simulation.
    if (!state.currentProject && !state.isLoading) {
      void loadSimulation(state.currentProjectId);
    }
  }, [loadSimulation, state.currentProject, state.isLoading, state.currentProjectId]);

  // The visual "hue" of the current simulation, derived from its state.
  const simulationHues = useMemo(() => {
    const projectGradient = state.currentProject?.gradient; // The "glitch" or "truth" color scheme
    if (!projectGradient) return 'from-gray-900 to-black';
    // Aseguramos que las clases se apliquen correctamente.
    return `${projectGradient[state.phase] || 'from-gray-900 to-black'}`;
  }, [state.currentProject, state.phase]);

  return (
    <MotionConfig transition={{ duration: 0.75, ease: 'easeInOut' }}>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {/* Is the user plugged in? Or are we syncing with reality? */}
          {!state.currentProject ? (
            // Awaiting sync with The Oracle.
            <motion.div key="loader">
              <OracleSyncLoader />
            </motion.div>
          ) : (
            // Rendering the Matrix simulation.
            <motion.div key="scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Canvas
                shadows
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.toneMappingExposure = 0.8;
                }}
              >
                <Main3DScene />
              </Canvas>
              <div
                className={`absolute inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-br ${simulationHues}`}
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
