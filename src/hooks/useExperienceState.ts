import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { produce } from 'immer';

export type ProjectId = 'toro' | 'cristal' | 'onda' | 'estructura';
export type Phase = 'curiosity' | 'discovery' | 'connection';

export interface Project {
  id: ProjectId;
  title: string;
  narrative: { title: string; description: string }[];
  phases: Phase[];
  gradient: Record<Phase, string>;
  emissiveColor: string;
}

export interface ExperienceState {
  currentProjectId: ProjectId;
  currentProject: Project | null;
  phase: Phase;
  clickCount: number;
  isLoading: boolean;
  error: string | null;
}

interface ExperienceActions {
  promote: (id: ProjectId) => void;
  forget: (id: ProjectId) => void;
  setRawData: (data: Project[]) => void; // Asumiendo que ahora manejamos una lista
  loadProject: (projectId: ProjectId) => Promise<void>;
  incrementClick: () => void;
}

const initialState: ExperienceState = {
  currentProjectId: 'toro',
  currentProject: null,
  phase: 'curiosity',
  clickCount: 0,
  isLoading: true,
  error: null,
};

const StateContext = createContext<ExperienceState | null>(null);
const ActionsContext = createContext<ExperienceActions | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExperienceState>(initialState);

  const actions: ExperienceActions = useMemo(
    () => ({
      loadProject: async (projectId: ProjectId) => {
        setState(s => produce(s, draft => {
          draft.isLoading = true;
          draft.currentProjectId = projectId;
          draft.error = null;
        }));
        try {
          const response = await fetch(`/models/metadata/${projectId}.json`);
          if (!response.ok) throw new Error(`Metadata for ${projectId} not found.`);
          const metadata: Project = await response.json();
          setState(s => produce(s, draft => {
            draft.isLoading = false;
            draft.currentProject = metadata;
            draft.clickCount = 0;
            draft.phase = 'curiosity';
          }));
        } catch (e) {
          const error = e instanceof Error ? e.message : 'An unknown error occurred';
          setState(s => produce(s, draft => {
            draft.isLoading = false;
            draft.error = error;
          }));
        }
      },
      incrementClick: () => {
        setState(s => produce(s, draft => {
          if (!draft.currentProject) return;
          draft.clickCount += 1;
          const phases = draft.currentProject.phases;
          const currentPhaseIndex = phases.indexOf(draft.phase);
          draft.phase = phases[currentPhaseIndex + 1] || draft.phase;
        }));
      },
      // Implementaciones de ejemplo para promote/forget
      promote: (id: ProjectId) => console.log('Promote action called for', id),
      forget: (id: ProjectId) => console.log('Forget action called for', id),
      setRawData: (data: Project[]) => console.log('setRawData called with', data),
    }),
    []
  );

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
}

export const useSelector = <T,>(selector: (state: ExperienceState) => T): T => {
  const state = useContext(StateContext);
  if (!state) {
    throw new Error('useSelector must be used within an ExperienceProvider');
  }
  return selector(state);
};

export const useExperienceActions = (): ExperienceActions => {
  const actions = useContext(ActionsContext);
  if (!actions) {
    throw new Error('useExperienceActions must be used within an ExperienceProvider');
  }
  return actions;
};
