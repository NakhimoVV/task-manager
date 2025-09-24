import './Board.scss'
import type { Status, Task } from '@/entities/task/model/types.ts'
import clsx from 'clsx'
import TaskCard from '@/entities/task/ui/TaskCard'
import Button from '@/shared/ui/Button'

type BoardProps = {}
type ColumnType = { key: Status; title: string }

const columns: ColumnType[] = [
  { key: 'backlog', title: 'Backlog' },
  { key: 'in-progress', title: 'In Progress' },
  { key: 'in-review', title: 'In Review' },
  { key: 'completed', title: 'Completed' },
]

const Board = (props: BoardProps) => {
  const {} = props

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Investigate Framer-Motion for animations.',
      status: 'backlog',
      background: null,
      tags: ['concept'],
    },
    {
      id: 2,
      title: 'Implement CRUD (Create, Read, Update, and Delete) operations',
      status: 'backlog',
      background:
        'https://github.com/devchallenges-io/curriculum/blob/main/4-frontend-libaries/challenges/group_1/data/task-manager/image-3.jpg?raw=true',
      tags: ['technical'],
    },
    {
      id: 3,
      title: 'Implement the ability for users to edit tasks.',
      status: 'in-progress',
      background: null,
      tags: ['technical', 'front-end'],
    },
    {
      id: 4,
      title:
        'Implement the ability for users to view a specific subset of tasks.',
      status: 'in-progress',
      background: null,
      tags: ['technical', 'front-end'],
    },
    {
      id: 5,
      title:
        'Use the useEffect state Hook to update the number of pending tasks',
      status: 'in-progress',
      background:
        'https://github.com/devchallenges-io/curriculum/blob/main/4-frontend-libaries/challenges/group_1/data/task-manager/image-2.jpg?raw=true',
      tags: ['technical', 'front-end'],
    },
    {
      id: 6,
      title:
        'Implement the ability for users to delete tasks using the mouse or keyboard.',
      status: 'in-review',
      background: null,
      tags: ['technical', 'front-end'],
    },
    {
      id: 7,
      title:
        'Implement the ability for users to add tasks using the mouse or keyboard.',
      status: 'in-review',
      background:
        'https://github.com/devchallenges-io/curriculum/blob/main/4-frontend-libaries/challenges/group_1/data/task-manager/image-4.jpg?raw=true',
      tags: ['technical', 'front-end'],
    },
    {
      id: 8,
      title: 'Create a basic App component structure and styling.',
      status: 'completed',
      background: null,
      tags: ['technical', 'front-end'],
    },
    {
      id: 9,
      title: 'Design Todo App',
      status: 'completed',
      background: null,
      tags: ['design'],
    },
  ]

  return (
    <main className="board">
      <div className="board__inner">
        <section className="board__body">
          {columns.map(({ key, title }) => {
            const filteredTasks = tasks.filter((task) => task.status === key)

            return (
              <div
                className={clsx('board__column', {
                  [`board__column--${key}`]: key,
                })}
                key={key}
              >
                <header className="board__column-header">
                  <span className="board__column-status"></span>
                  <span>{`${title} (${filteredTasks.length})`}</span>
                </header>
                <div className="board__column-body">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard task={task} key={task.id} />
                    ))
                  ) : (
                    <p>No tasks</p>
                  )}
                </div>
                {key === 'backlog' && (
                  <footer className="board__column-actions">
                    <Button label="Add new task card" mode="add-task" />
                  </footer>
                )}
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export default Board
