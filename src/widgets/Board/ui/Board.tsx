import './Board.scss'
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
import { useBoardStore } from '@/entities/board/model/store.ts'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import { statusList as columns } from '@/shared/constants/statusList.ts'
import Status from '@/shared/ui/Status'

const Board = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const moveTask = useTaskStore((state) => state.moveTask)
  const selectedBoardId = useBoardStore((state) => state.selectedBoardId)
  const setTasksForBoard = useBoardStore((state) => state.setTasksForBoard)
  const { openModal } = useModalStore()

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

    if (selectedBoardId !== undefined) {
      const updatedTasks = useTaskStore.getState().tasks
      setTasksForBoard(selectedBoardId, updatedTasks)
    }
  }

  return (
    <main className="board">
      <div className="board__inner">
        <DragDropContext onDragEnd={onDragEnd}>
          <section className="board__body">
            {columns.map(({ value: key, label: title }) => {
              const filteredTasks = tasks.filter((task) => task.status === key)

              return (
                <div className={clsx('board__column')} key={key}>
                  <header className="board__column-header">
                    <Status
                      mode={key}
                      title={title}
                      count={filteredTasks.length}
                    />
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
                      <Button
                        label="Add new task card"
                        mode="add-task"
                        onClick={() => openModal('createTask')}
                      />
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
