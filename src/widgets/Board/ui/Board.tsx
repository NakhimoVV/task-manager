import './Board.scss'
import type { Status } from '@/entities/task/model/types.ts'
import clsx from 'clsx'
import TaskCard from '@/entities/task/ui/TaskCard'
import Button from '@/shared/ui/Button'
import { useTaskStore } from '@/entities/task/model/store.ts'
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd'

type ColumnType = { key: Status; title: string }

const columns: ColumnType[] = [
  { key: 'backlog', title: 'Backlog' },
  { key: 'in-progress', title: 'In Progress' },
  { key: 'in-review', title: 'In Review' },
  { key: 'completed', title: 'Completed' },
]

const Board = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const moveTask = useTaskStore((state) => state.moveTask)

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }

    moveTask(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index,
      draggableId,
    )
  }

  return (
    <main className="board">
      <div className="board__inner">
        <DragDropContext onDragEnd={onDragEnd}>
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
                  <Droppable droppableId={key}>
                    {(provided) => (
                      <div
                        className="board__column-body"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredTasks.length > 0 ? (
                          filteredTasks.map((task, index) => (
                            <Draggable
                              draggableId={task.id.toString()}
                              index={index}
                              key={task.id}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard task={task} />
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <p>No tasks</p>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  {key === 'backlog' && (
                    <footer className="board__column-actions">
                      <Button label="Add new task card" mode="add-task" />
                    </footer>
                  )}
                </div>
              )
            })}
          </section>
        </DragDropContext>
      </div>
    </main>
  )
}

export default Board
