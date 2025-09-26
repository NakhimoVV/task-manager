import type { Status, Task, TasksFromApi } from '@/entities/task/model/types.ts'
import { create } from 'zustand'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { getTasks } from '@/entities/task/api/getTasks.ts'

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

export const useTaskStore = create<TaskStore>((set, get) => ({
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
    // если статус не изменился то я чекаю ориг индекс by массив и меняю их
    // а если статус изменился то я меняю статус и переставляю индексы в оригМассиве
    const tasks = [...get().tasks]
    const targetTaskIndex = tasks.findIndex(
      (task) => task.id.toString() === draggableId,
    )

    if (targetTaskIndex === -1) {
      return
    }

    if (sourceId === destinationId) {
      if (sourceIndex === destinationIndex) {
        return
      }
    }

    const [movedTask] = tasks.splice(targetTaskIndex, 1)

    if (sourceId !== destinationId) {
      movedTask.status = destinationId as Status
    }

    const destinationColumn = tasks.filter(
      (task) => task.status === destinationId,
    )
    const destinationColumnIds = destinationColumn.map((task) =>
      task.id.toString(),
    )
    let insertAtIndex
    if (destinationIndex >= destinationColumn.length) {
      insertAtIndex = tasks.length
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
}))
