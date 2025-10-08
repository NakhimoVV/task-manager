import type { Board } from '@/entities/board/model/types.ts'
import { API_URL } from '@/shared/config/API_URL.ts'

export async function getBoards(): Promise<Board[]> {
  const res = await fetch(API_URL)

  if (!res.ok) {throw new Error('Failed to fetch all boards!')}

  return res.json()
}
