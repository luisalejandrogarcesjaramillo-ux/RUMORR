import { motion } from 'framer-motion';
import { useHabitanteStore } from '@/stores/useHabitanteStore';
import { useSantuarioStore } from '@/stores/useSantuarioStore';
import { Artefacto } from '@/types';

export const OrbitaArtefacto = ({ artefacto }: { artefacto: Artefacto }) => {
  const addGesture = useHabitanteStore((state) => state.addGesture);
  const { promoteArtefacto, forgetArtefacto } = useSantuarioStore((state) => state.actions);

  // El tamaño y brillo del artefacto dependen de su relevancia global
  const scale = 0.8 + artefacto.globalRelevance * 0.05;
  const brightness = 0.7 + artefacto.globalRelevance * 0.03;

  // 1.1. El Temblor del Movimiento: Añade una imperfección a la animación
  const randomOffset = Math.random() * 10 - 5; // Un número entre -5 y 5

  const handlePromote = () => {
    promoteArtefacto(artefacto.id);
    addGesture(artefacto.id, 'promote');
  };

  const handleForget = () => {
    forgetArtefacto(artefacto.id);
    addGesture(artefacto.id, 'forget');
  };

  return (
    <motion.div
      className="absolute cursor-pointer p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20"
      style={{
        left: `${50 + Math.sin(artefacto.globalRelevance) * 30}%`,
        top: `${50 + Math.cos(artefacto.globalRelevance) * 30}%`,
        filter: `brightness(${brightness})`,
      }}
      whileHover={{ scale: scale * 1.1, transition: { duration: 0.3 } }}
      animate={{ y: [0, -15 + randomOffset, 0], transition: { repeat: Infinity, duration: 5 + artefacto.globalRelevance * 0.5 } }}
    >
      <h3 className="text-white font-bold text-lg">{artefacto.name}</h3>
      <p className="text-white/60 text-sm">Relevancia: {artefacto.globalRelevance}</p>
      {/* Aquí irían los botones de promote/forget */}
    </motion.div>
  );
};