import type tagList from '@/entities/board/model/tagList.ts'

export type Task = {
  id: number
  title: string
  status: Status
  background: string | null
  tags: Tag[]
}

export type Status = 'backlog' | 'in-progress' | 'in-review' | 'completed'

export type Tag = (typeof tagList)[number]
