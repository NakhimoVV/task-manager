import { create } from 'zustand/react'
import type { Board } from '@/entities/board/model/types.ts'
import { getBoards } from '@/entities/board/api/getBoards.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'

type BoardStore = {
  boards: Board[]
  selectedBoardId: number | null
  isLoading: boolean
  errorMessage: string | null
  fetchBoards: () => Promise<void>
  selectBoard: (id: number) => void
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  selectedBoardId: null,
  isLoading: false,
  errorMessage: null,

  fetchBoards: async () => {
    set({ isLoading: true })
    try {
      const boards = await getBoards()
      set({ boards, selectedBoardId: boards[0].id })
    } catch (error) {
      set({ errorMessage: getErrorMessage(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  selectBoard: (id) => set({ selectedBoardId: id }),
}))
