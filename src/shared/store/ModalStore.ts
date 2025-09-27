import { create } from 'zustand/react'

type ModalType = 'createBoard' | 'editTask' | null

type ModalStore = {
  openModal: (type: ModalType) => void
  closeModal: () => void
  modalType: ModalType
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,

  openModal: (type) => set({ modalType: type }),

  closeModal: () => set({ modalType: null }),
}))
