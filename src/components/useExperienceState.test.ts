import { renderHook, act } from '@testing-library/react';
import { ExperienceProvider, useSelector, useExperienceActions } from './useExperienceState';
import { ReactNode } from 'react';
import { mockProjects } from '@/data/projects';

// Wrapper para proveer el contexto necesario al hook
const wrapper = ({ children }: { children: ReactNode }) => (
  <ExperienceProvider>{children}</ExperienceProvider>
);

describe('useExperienceState Hook', () => {
  it('debería inicializar con el estado por defecto', () => {
    const { result } = renderHook(() => useSelector(state => state), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentProject).toBe(null);
    expect(result.current.clickCount).toBe(0);
    expect(result.current.phase).toBe('curiosity');
  });

  it('debería manejar la carga exitosa de un proyecto', async () => {
    const { result } = renderHook(() => ({ 
      state: useSelector(state => state), 
      actions: useExperienceActions() 
    }), { wrapper });

    const testProject = mockProjects[0];

    await act(async () => {
      await result.current.actions.loadProject(testProject.id);
    });

    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.currentProject).toEqual(testProject);
    expect(result.current.state.error).toBe(null);
  });

  it('debería incrementar el contador de clics y actualizar la fase', async () => {
    const { result } = renderHook(() => ({ 
      state: useSelector(state => state), 
      actions: useExperienceActions() 
    }), { wrapper });

    const testProject = mockProjects[0];

    // Primero, cargamos un proyecto
    await act(async () => {
      await result.current.actions.loadProject(testProject.id);
    });

    // Luego, simulamos un clic
    act(() => {
      result.current.actions.incrementClick();
    });

    expect(result.current.state.clickCount).toBe(1);
    // Suponiendo que el proyecto tiene al menos 2 fases narrativas
    expect(result.current.state.phase).toBe(testProject.phases[1]);
  });
});