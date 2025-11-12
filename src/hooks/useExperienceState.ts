import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

export type ProjectId = 'toro' | 'cristal' | 'onda' | 'estructura';
export type Phase = 'curiosity' | 'discovery' | 'connection';

export interface InteractionData {
  timestamp: number;
  type: 'hover' | 'click' | 'view';
  projectId: ProjectId;
}

export interface Project {
  id: ProjectId;
  title: string;
  narrative: {
    title: string;
    description: string;
  }[];
  gradient: {
    curiosity: string;
    discovery: string;
    connection: string;
  };
  emissiveColor: string;
}

export interface ExperienceState {
  currentProjectId: ProjectId;
  currentProject: Project | null;
  phase: Phase;
  interactions: InteractionData[];
  clickCount: number;
  isLoading: boolean;
  error: string | null;
}

export type ExperienceAction =
  | { type: 'PROJECT_LOAD_START'; payload: ProjectId }
  | { type: 'PROJECT_LOAD_SUCCESS'; payload: Project }
  | { type: 'PROJECT_LOAD_ERROR'; payload: string }
  | { type: 'SET_PHASE'; payload: Phase }
  | { type: 'INCREMENT_CLICK' }
  | { type: 'ADD_INTERACTION'; payload: InteractionData }
  | { type: 'RESET_INTERACTIONS' };

const initialState: ExperienceState = {
  currentProjectId: 'toro',
  currentProject: null,
  phase: 'curiosity',
  interactions: [],
  clickCount: 0,
  isLoading: true,
  error: null,
};

function experienceReducer(state: ExperienceState, action: ExperienceAction): ExperienceState {
  switch (action.type) {
    case 'PROJECT_LOAD_START':
      return {
        ...state,
        isLoading: true,
        currentProjectId: action.payload,
        error: null,
      };
    case 'PROJECT_LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        currentProject: action.payload,
        currentProjectId: action.payload.id,
        // Reset progress when a new project loads
        clickCount: 0,
        phase: 'curiosity',
      };
    case 'PROJECT_LOAD_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'INCREMENT_CLICK': {
      const newClickCount = state.clickCount + 1;
      let newPhase: Phase = 'curiosity';
      if (newClickCount >= 1) newPhase = 'discovery';
      if (newClickCount >= state.currentProject?.narrative.length - 1) newPhase = 'connection';

      return { ...state, clickCount: newClickCount, phase: newPhase };
    }
    case 'ADD_INTERACTION':
      return {
        ...state,
        interactions: [...state.interactions, action.payload],
      };
    case 'RESET_INTERACTIONS':
      return { ...state, clickCount: 0, phase: 'curiosity' };
    default:
      return state;
  }
}

interface ExperienceStateContextType {
  state: ExperienceState;
  dispatch: React.Dispatch<ExperienceAction>;
}

const ExperienceContext = createContext<ExperienceStateContextType | undefined>(
  undefined
);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(experienceReducer, initialState);

  return (
    <ExperienceContext.Provider value={{ state, dispatch }}>
      {children}
    </ExperienceContext.Provider>
  );
}

function useExperienceContext() {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperienceState must be used within an ExperienceProvider');
  }
  return context;
}

export function useExperienceDispatch() {
  const { dispatch } = useExperienceContext();

  const loadProject = useCallback(async (projectId: ProjectId) => {
    dispatch({ type: 'PROJECT_LOAD_START', payload: projectId });
    try {
      const response = await fetch(`/models/metadata/${projectId}.json`);
      if (!response.ok) throw new Error(`Metadata for ${projectId} not found.`);
      const metadata: Project = await response.json();
      dispatch({ type: 'PROJECT_LOAD_SUCCESS', payload: metadata });
    } catch (e) {
      const error = e instanceof Error ? e.message : 'An unknown error occurred';
      dispatch({ type: 'PROJECT_LOAD_ERROR', payload: error });
    }
  }, []);
  
  return { dispatch, loadProject };
}

export function useExperienceState<T>(selector: (state: ExperienceState) => T): T {
  const { state } = useExperienceContext();
  return selector(state);
}
