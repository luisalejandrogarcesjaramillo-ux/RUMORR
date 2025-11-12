import { Canvas } from '@react-three/fiber';
import { Suspense, memo, useEffect, version } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { DynamicModel } from './DynamicModel';
import { NarrativeOverlay } from './NarrativeOverlay';
import { ProjectGallery } from './ProjectGallery';
import { FloatingCTA } from './FloatingCTA';
import { useExperienceState } from '@/hooks/useExperienceState';

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

function SceneComponent() {
  const { state, dispatch, loadProject } = useExperienceState();

  useEffect(() => {
    // Carga el proyecto inicial solo una vez al montar la escena.
    if (!state.currentProject && !state.isLoading) {
      void loadProject(state.currentProjectId);
    }
  }, [loadProject, state.currentProject, state.isLoading, state.currentProjectId]);

  if (!state.currentProject) {
    return <EtherealLoader />;
  }

  const gradientClass = state.currentProject?.gradient?.[state.phase] || 'from-gray-900 to-black';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        shadows={THREE.PCFSoftShadowMap}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FFA500" />
        
        <AnimatePresence mode="wait">
          <motion.div key={state.currentProject?.id}>
            <Suspense fallback={null}>
              <Environment preset="sunset" background={false} />
              <DynamicModel onInteraction={() => dispatch({ type: 'INCREMENT_CLICK' })} />
            </Suspense>
          </motion.div>
        </AnimatePresence>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={10} />
      </Canvas>

      {/* Gradiente de fondo */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom right, ${gradientClass})`,
          opacity: 0.3,
        }}
      />

      {/* UI Flotante */}
      <ProjectGallery />
      <NarrativeOverlay />
      <FloatingCTA />
    </div>
  );
}

export const Scene = memo(SceneComponent);
Scene.displayName = 'Scene';
