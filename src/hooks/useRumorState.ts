import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export type ProjectId = 'toro' | 'cristal' | 'onda' | 'estructura';
export type Phase = 'curiosity' | 'discovery' | 'connection';

export interface InteractionData {
  timestamp: number;
  type: 'hover' | 'click' | 'view';
  projectId: ProjectId;
}

export interface RumorState {
  currentProject: ProjectId;
  phase: Phase;
  interactions: InteractionData[];
  clickCount: number;
  isLoading: boolean;
}

export type RumorAction =
  | { type: 'LOAD_PROJECT'; payload: ProjectId }
  | { type: 'SET_PHASE'; payload: Phase }
  | { type: 'INCREMENT_CLICK' }
  | { type: 'ADD_INTERACTION'; payload: InteractionData }
  | { type: 'RESET' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: RumorState = {
  currentProject: 'toro',
  phase: 'curiosity',
  interactions: [],
  clickCount: 0,
  isLoading: false,
};

function rumorReducer(state: RumorState, action: RumorAction): RumorState {
  switch (action.type) {
    case 'LOAD_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        clickCount: 0,
        phase: 'curiosity',
      };
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'INCREMENT_CLICK':
      return { ...state, clickCount: state.clickCount + 1 };
    case 'ADD_INTERACTION':
      return {
        ...state,
        interactions: [...state.interactions, action.payload],
      };
    case 'RESET':
      return initialState;
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface RumorContextType {
  state: RumorState;
  dispatch: React.Dispatch<RumorAction>;
}

const RumorContext = createContext<RumorContextType | undefined>(undefined);

export function RumorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rumorReducer, initialState);

  useEffect(() => {
    localStorage.setItem('rumorState', JSON.stringify(state));
  }, [state]);

  return { state, dispatch, children };
}

export function useRumorState(): RumorState {
  const provider = useContext(RumorContext);
  if (!provider) {
    return initialState;
  }
  return provider.state;
}

export function usePhaseTransition() {
  const state = useRumorState();

  let phase: Phase = 'curiosity';
  if (state.clickCount >= 1) phase = 'discovery';
  if (state.clickCount >= 3) phase = 'connection';

  return phase;
}
