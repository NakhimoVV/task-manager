export type Board = {
  name: string
  emoji: string
  color?: string
  id: number
  link?: string
}

export type BoardFormData = Omit<Board, 'link' | 'color'>
