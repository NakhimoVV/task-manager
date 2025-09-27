import { create } from 'zustand/react'
import type { Board } from '@/entities/board/model/types.ts'
import { getBoards } from '@/entities/board/api/getBoards.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Task, TasksFromApi } from '@/entities/task/model/types.ts'
import { getTasks } from '@/entities/task/api/getTasks.ts'
import { useTaskStore } from '@/entities/task/model/store.ts'

type BoardStore = {
  boards: Board[]
  tasksByBoard: Record<number, Task[]>
  selectedBoardId?: number
  isLoading: boolean
  errorMessage: string | null
  fetchBoards: () => Promise<void>
  fetchTasksForBoard: (boardId: number) => Promise<void>
  selectBoard: (id: number) => void
  setTasksForBoard: (boardId: number, tasks: Task[]) => void
  getTasksForBoard: (boardId: number) => Task[] | undefined
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: [],
      tasksByBoard: {},
      selectedBoardId: undefined,
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

      fetchTasksForBoard: async (boardId) => {
        const selectedBoard = get().boards.find((b) => b.id === boardId)
        if (!selectedBoard) return

        set({ errorMessage: null })
        try {
          const data: TasksFromApi = await getTasks(
            selectedBoard.link,
            selectedBoard.name,
          )
          set({
            tasksByBoard: { ...get().tasksByBoard, [boardId]: data.tasks },
          })
          useTaskStore.getState().setTasks(data.tasks)
        } catch (error) {
          set({ errorMessage: getErrorMessage(error) })
        }
      },

      selectBoard: (id) => set({ selectedBoardId: id }),

      setTasksForBoard: (boardId, tasks) =>
        set({
          tasksByBoard: { ...get().tasksByBoard, [boardId]: tasks },
        }),

      getTasksForBoard: (boardId) => get().tasksByBoard[boardId],
    }),
    {
      name: 'boards-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
