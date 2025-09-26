import type { Status, Task, TasksFromApi } from '@/entities/task/model/types.ts'
import { create } from 'zustand'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { getTasks } from '@/entities/task/api/getTasks.ts'
import { createJSONStorage, persist } from 'zustand/middleware'

type TaskStore = {
  tasks: Task[]
  isLoading: boolean
  errorMessage: string | null
  fetchTasks: (url: string, boardName: string) => Promise<void>
  changeStatus: (taskId: number, newStatus: Status) => void
  moveTask: (
    sourceId: string,
    sourceIndex: number,
    destinationId: string,
    destinationIndex: number,
    draggableId: string,
  ) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      errorMessage: null,

      fetchTasks: async (url, boardName) => {
        set({ isLoading: true, errorMessage: null })
        try {
          const data: TasksFromApi = await getTasks(url, boardName)
          set({ tasks: data.tasks })
        } catch (error) {
          set({ errorMessage: getErrorMessage(error) })
        } finally {
          set({ isLoading: false })
        }
      },

      changeStatus: (taskId, newStatus) => {
        const updatedTasks = get().tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        )

        set({ tasks: updatedTasks })
      },

      moveTask: (
        sourceId,
        sourceIndex,
        destinationId,
        destinationIndex,
        draggableId,
      ) => {
        if (sourceId === destinationId && sourceIndex === destinationIndex) {
          return
        }

        const tasks = [...get().tasks]
        const targetTaskIndex = tasks.findIndex(
          (task) => task.id.toString() === draggableId,
        )

        if (targetTaskIndex === -1) {
          return
        }

        const destinationColumn = tasks.filter(
          (task) => task.status === destinationId,
        )
        const destinationColumnIds = destinationColumn.map((task) =>
          task.id.toString(),
        )

        if (destinationColumn.length === 0) {
          get().changeStatus(Number(draggableId), destinationId as Status)

          return
        }

        const [movedTask] = tasks.splice(targetTaskIndex, 1)

        if (sourceId !== destinationId) {
          movedTask.status = destinationId as Status
        }

        let insertAtIndex

        if (destinationIndex === destinationColumn.length) {
          const lastTaskIdInColumn =
            destinationColumnIds[destinationColumnIds.length - 1]
          const lastTaskBaseIndex = tasks.findIndex(
            (task) => task.id.toString() === lastTaskIdInColumn,
          )
          insertAtIndex = lastTaskBaseIndex + 1
        } else {
          // ищем позицию таска с таким индексом в общем массиве
          const destinationTaskId = destinationColumnIds[destinationIndex]
          insertAtIndex = tasks.findIndex(
            (task) => task.id.toString() === destinationTaskId,
          )
        }

        tasks.splice(insertAtIndex, 0, movedTask)

        set({ tasks })
      },
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
