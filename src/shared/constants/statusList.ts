import type { Status } from '@/entities/task/model/types.ts'

export type StatusEntity = { label: string; value: Status }

export const statusList: StatusEntity[] = [
  {
    label: 'Backlog',
    value: 'backlog',
  },
  {
    label: 'In Progress',
    value: 'in-progress',
  },
  {
    label: 'In Review',
    value: 'in-review',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
]
