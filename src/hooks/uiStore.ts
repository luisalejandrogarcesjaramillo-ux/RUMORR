import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalContent {
  title: string;
  body: string;
}

interface UIState {
  isModalOpen: boolean;
  modalContent: ModalContent | null;
  isLoading: boolean;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isModalOpen: false,
      modalContent: null,
      isLoading: false,
      openModal: (content) => set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'ui-store' }
  )
);