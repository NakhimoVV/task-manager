import type { TasksFromApi } from '@/entities/task/model/types.ts'

export async function getTasks(
  url: string,
  boardName: string,
): Promise<TasksFromApi> {
  const res = await fetch(url)

  if (!res.ok) {throw new Error(`Failed to fetch ${boardName} tasks!`)}

  return res.json()
}
