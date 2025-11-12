import { memo } from 'react';
import { motion } from 'framer-motion';
import { useExperienceState, ProjectId } from '@/hooks/useExperienceState';
import { useAnalytics } from '@/hooks/useAnalytics';

const availableProjects: { id: ProjectId; shortTitle: string; icon: string; label: string }[] = [
  { id: 'toro', shortTitle: 'TORO', icon: '🐂', label: 'El Guardián' },
  { id: 'cristal', shortTitle: 'CRISTAL', icon: '💎', label: 'Transparencia' },
  { id: 'onda', shortTitle: 'ONDA', icon: '🌊', label: 'Flujo' },
  { id: 'estructura', shortTitle: 'ESTRUCT', icon: '🏗️', label: 'Cimiento' },
];

function ProjectGalleryComponent() {
  const { state, loadProject } = useExperienceState();
  const { trackEvent } = useAnalytics();

  const handleProjectSelect = (projectId: ProjectId) => {
    void loadProject(projectId);
    trackEvent('project_selected');
  };

  return (
    <motion.nav
      className="fixed top-4 right-4 z-50 flex gap-2 p-2 bg-black/50 backdrop-blur-md rounded-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {availableProjects.map((project) => (
        <motion.button
          key={project.id}
          className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            state.currentProjectId === project.id
              ? 'bg-white text-black shadow-lg border-2 border-white'
              : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/40'
          }`}
          disabled={state.isLoading}
          onClick={() => handleProjectSelect(project.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={project.label}
        >
          <span className="text-2xl">{project.icon}</span>
        </motion.button>
      ))}
    </motion.nav>
  );
}

export const ProjectGallery = memo(ProjectGalleryComponent);
