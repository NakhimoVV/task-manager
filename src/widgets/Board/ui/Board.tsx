import './Board.scss'
import type { Status } from '@/entities/task/model/types.ts'
import clsx from 'clsx'
import TaskCard from '@/entities/task/ui/TaskCard'
import Button from '@/shared/ui/Button'
import { useTaskStore } from '@/entities/task/model/store.ts'

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
  const tasks = useTaskStore((state) => state.tasks)
  const isLoading = useTaskStore((state) => state.isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

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
