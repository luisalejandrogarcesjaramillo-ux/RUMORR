// src/data/projects.ts
// Datos mock para pruebas y desarrollo

import { Project } from '@/hooks/useExperienceState';

export const mockProjects: Project[] = [
  {
    id: 'toro',
    title: 'El Toro de la Verdad',
    narrative: [
      { title: 'Curiosidad', description: 'Un rumor emerge...' },
      { title: 'Descubrimiento', description: 'La verdad se revela.' },
      { title: 'Conexión', description: 'Entiende el impacto.' },
    ],
    phases: ['curiosity', 'discovery', 'connection'],
    gradient: {
      curiosity: 'from-red-900 to-black',
      discovery: 'from-blue-900 to-red-900',
      connection: 'from-green-900 to-blue-900',
    },
    emissiveColor: '#FF3131',
  },
  // Puedes añadir más proyectos mock aquí si es necesario
];