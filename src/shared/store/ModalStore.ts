import { create } from 'zustand/react'

type ModalType = 'createBoard' | 'editTask' | 'createTask' | null

type ModalStore = {
  type: ModalType
  payload?: unknown
  openModal: (type: ModalType, payload?: unknown) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  payload: undefined,

  openModal: (type, payload) => set({ type, payload }),

  closeModal: () => set({ type: null }),
}))
