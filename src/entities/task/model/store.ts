import type { Task, TasksFromApi } from '@/entities/task/model/types.ts'
import { create } from 'zustand/react'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { getTasks } from '@/entities/task/api/getTasks.ts'

type TaskStore = {
  tasks: Task[]
  isLoading: boolean
  errorMessage: string | null
  fetchTasks: (url: string, boardName: string) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  errorMessage: null,

  fetchTasks: async (url, boardName) => {
    set({ isLoading: true })
    try {
      const data: TasksFromApi = await getTasks(url, boardName)
      set({ tasks: data.tasks })
    } catch (error) {
      set({ errorMessage: getErrorMessage(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))
