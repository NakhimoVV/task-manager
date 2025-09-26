import { create } from 'zustand/react'
import type { Board } from '@/entities/board/model/types.ts'
import { getBoards } from '@/entities/board/api/getBoards.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { createJSONStorage, persist } from 'zustand/middleware'

type BoardStore = {
  boards: Board[]
  selectedBoardId: number | null
  isLoading: boolean
  errorMessage: string | null
  fetchBoards: () => Promise<void>
  selectBoard: (id: number) => void
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [], // TODO: добавить состояние всех тасков
      selectedBoardId: null,
      isLoading: false,
      errorMessage: null,

      fetchBoards: async () => {
        if (get().boards.length > 0) {
          return
        }

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
    }),
    {
      name: 'boards-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
