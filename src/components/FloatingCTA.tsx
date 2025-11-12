import { useState, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceState } from '@/hooks/useExperienceState';
import { useAnalytics } from '@/hooks/useAnalytics';

function FloatingCTAComponent() {
  const { state } = useExperienceState();
  const { trackEvent } = useAnalytics();
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isNarrativeComplete = state.currentProject ? state.clickCount >= state.currentProject.narrative.length : false;

  const handleSubmit = async (type: 'preorder' | 'newsletter') => {
    if (!email) return;
    setIsLoading(true);
    setMessage('');
    trackEvent('cta_submit_start', { projectId: state.currentProjectId, type });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type, projectId: state.currentProjectId }),
      });

      if (response.ok) {
        setMessage('✅ ¡Gracias! Te contactaremos pronto.');
        trackEvent('cta_submit_success', { projectId: state.currentProjectId, type });
        setEmail('');
        timeoutRef.current = setTimeout(() => {
          setIsExpanded(false);
        }, 2500);
      } else {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.error || 'Algo salió mal.'}`);
        trackEvent('cta_submit_error', { projectId: state.currentProjectId, type, error: errorData.error });
      }
    } catch (error) {
      setMessage('❌ Error de conexión.');
      trackEvent('cta_submit_error', { projectId: state.currentProjectId, type, error: 'Connection error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Limpiar el timeout si el componente se desmonta
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isNarrativeComplete) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="p-6 bg-black/80 text-white rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl w-80"
          >
            <h3 className="text-lg font-bold mb-2">Únete al Viaje</h3>
            <p className="text-sm text-gray-400 mb-4">Sé el primero en explorar el futuro de la narrativa digital.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all mb-3"
              placeholder="tu@email.com"
            />
            <button
              onClick={() => handleSubmit('preorder')}
              disabled={!email || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Enviando...' : 'Reservar Acceso'}
            </button>
            {message && <p className="mt-3 text-xs text-center text-green-300">{message}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all"
        aria-label="Unirse"
      >
        {/* Icono de Conexión/Universo */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </motion.button>
    </div>
  );
}

export const FloatingCTA = memo(FloatingCTAComponent);