import type { Status, Task } from '@/entities/task/model/types.ts'
import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'
import generateId from '@/shared/lib/generateId.ts'
import { useBoardStore } from '@/entities/board/model/store.ts'

type TaskStore = {
  tasks: Task[]
  isLoading: boolean
  errorMessage: string | null
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  removeTask: (id: number) => void

  changeStatus: (taskId: number, newStatus: Status) => void
  getTaskById: (taskId: number | undefined) => Task | undefined
  moveTask: (
    sourceId: string,
    sourceIndex: number,
    destinationId: string,
    destinationIndex: number,
    draggableId: string,
  ) => void
}

const syncWithBoardStorage = (updatedTasks: Task[]) => {
  const selectedBoardId = useBoardStore.getState().selectedBoardId
  if (selectedBoardId !== undefined) {
    useBoardStore.getState().setTasksForBoard(selectedBoardId, updatedTasks)
  }
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      errorMessage: null,

      setTasks: (tasks) => set({ tasks }),

      changeStatus: (taskId, newStatus) => {
        const updatedTasks = get().tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        )

        set({ tasks: updatedTasks })
      },

      getTaskById: (id) => {
        if (!id) {
          return
        }
        return get().tasks.find((task) => task.id === id)
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

      addTask: (task) => {
        const resultTitle = task.title === '' ? 'Default task' : task.title

        const newTask = {
          ...task,
          title: resultTitle,
          id: generateId(),
        }
        const updated = [...get().tasks, newTask]

        set({ tasks: updated })

        syncWithBoardStorage(updated)
      },

      updateTask: (updateTask) => {
        const updated = get().tasks.map((task) =>
          task.id === updateTask.id ? updateTask : task,
        )

        set({ tasks: updated })

        syncWithBoardStorage(updated)
      },

      removeTask: (taskId) => {
        const filtered = get().tasks.filter(({ id }) => id !== taskId)

        set({ tasks: filtered })

        syncWithBoardStorage(filtered)
      },
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
