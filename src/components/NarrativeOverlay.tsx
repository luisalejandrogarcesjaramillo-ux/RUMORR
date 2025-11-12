import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from '@/hooks/useExperienceState';

function NarrativeOverlayComponent() {
  const currentProject = useSelector(state => state.currentProject);
  const clickCount = useSelector(state => state.clickCount);

  if (!currentProject) return null;

  const narrative = currentProject.narrative;
  const currentStep = narrative[clickCount];
  const isNarrativeComplete = clickCount >= narrative.length;
  
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        {!isNarrativeComplete && currentStep && (
          <motion.div
            key={currentStep.title}
            initial={{ opacity: 0, y: 20 }} // La narrativa "emerge" (Heidegger: Aletheia)
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }} // Curva de movimiento personalizada (Gestalt: Continuidad)
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4, ease: 'easeOut' } }} // Desaparece suavemente
            className="bg-black/50 text-white p-5 rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl text-center" // Glassmorfismo (Lowy: Capas de Cristal)
          >
            <h3 className="text-xl font-semibold mb-1 text-white tracking-wide">{currentStep.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{currentStep.description}</p>
            <div className="w-full bg-white/10 rounded-full h-1 mt-4">
              <motion.div
                className="bg-white h-1 rounded-full"
                initial={false}
                animate={{
                  width: `${((clickCount + 1) / narrative.length) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: 'circOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const NarrativeOverlay = memo(NarrativeOverlayComponent);