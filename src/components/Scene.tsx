import { Canvas } from '@react-three/fiber';
import { Suspense, memo, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import * as THREE from 'three';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { DynamicModel } from './DynamicModel';
import { NarrativeOverlay } from './NarrativeOverlay';
import { ProjectGallery } from './ProjectGallery';
import { FloatingCTA } from './FloatingCTA';
import { useExperienceState } from '@/hooks/useExperienceState';

/**
 * EtherealLoader: Un componente de carga visualmente atractivo que se muestra
 * mientras se obtiene el proyecto inicial.
 */
const EtherealLoader = memo(() => (
  <motion.div
    className="flex items-center justify-center w-full h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } }}
    exit={{ opacity: 0, transition: { duration: 1, ease: 'easeOut' } }}
  >
    <div className="text-white text-3xl font-extralight tracking-[0.5em]">RUMORR</div>
  </motion.div>
));

EtherealLoader.displayName = 'EtherealLoader';

/**
 * Main3DScene: Contiene exclusivamente los elementos de la escena 3D.
 * Se memoiza para evitar re-renders innecesarios cuando solo cambia el estado de la UI.
 */
const Main3DScene = memo(() => {
  const { dispatch } = useExperienceState();

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
        <DynamicModel onInteraction={() => dispatch({ type: 'INCREMENT_CLICK' })} />
        <Environment preset="sunset" background={false} />
      </Suspense>

      {/* --- SOMBRAS Y CONTROLES --- */}
      <ContactShadows frames={1} position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={10} />
    </>
  );
});

Main3DScene.displayName = 'Main3DScene';

function SceneComponent() {
  const { state, dispatch, loadProject } = useExperienceState();

  useEffect(() => {
    // Carga el proyecto inicial solo una vez al montar la escena.
    if (!state.currentProject && !state.isLoading) {
      void loadProject(state.currentProjectId);
    }
  }, [loadProject, state.currentProject, state.isLoading, state.currentProjectId]);

  // Memorizamos las clases del gradiente para evitar recalcular en cada render.
  const gradientClasses = useMemo(() => {
    const projectGradient = state.currentProject?.gradient;
    if (!projectGradient) return 'from-gray-900 to-black';
    // Aseguramos que las clases se apliquen correctamente.
    return `${projectGradient[state.phase] || 'from-gray-900 to-black'}`;
  }, [state.currentProject, state.phase]);

  return (
    <MotionConfig transition={{ duration: 0.75, ease: 'easeInOut' }}>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {!state.currentProject ? (
            // Usamos el ID como key para asegurar que AnimatePresence detecte la salida.
            <motion.div key="loader">
              <EtherealLoader />
            </motion.div>
          ) : (
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
                className={`absolute inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-br ${gradientClasses}`}
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

export const Scene = memo(SceneComponent);
Scene.displayName = 'Scene';
