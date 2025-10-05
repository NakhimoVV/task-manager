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
import ContextMenu from '@/shared/ui/ContextMenu'
import ContextMenuItem from '@/shared/ui/ContextMenu/ui/ContextMenuItem.tsx'
import { ContextMenuTrigger } from '@/shared/ui/ContextMenu/ui/ContextMenuTrigger.tsx'
import React, { useState } from 'react'
import { useContextMenu } from '@/shared/hooks/useContextMenu.ts'

const Board = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const moveTask = useTaskStore((state) => state.moveTask)
  const selectedBoardId = useBoardStore((state) => state.selectedBoardId)
  const setTasksForBoard = useBoardStore((state) => state.setTasksForBoard)
  const openModal = useModalStore((state) => state.openModal)
  const deleteTask = useTaskStore((state) => state.removeTask)
  const { contextMenu, showContextMenu, hideContextMenu } = useContextMenu()
  const [selectedTaskIdForMenu, setSelectedTaskIdForMenu] = useState<
    number | null
  >(null)

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

  const openContextMenu = (event: React.MouseEvent, boardId: number) => {
    setSelectedTaskIdForMenu(boardId)
    showContextMenu(event)
  }

  const handleDeleteTask = () => {
    if (
      selectedTaskIdForMenu &&
      window.confirm('Are you sure you want to delete this task?')
    ) {
      deleteTask(selectedTaskIdForMenu)
      hideContextMenu()
      setSelectedTaskIdForMenu(null)
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
                                <ContextMenuTrigger
                                  onContextMenu={(event) =>
                                    openContextMenu(event, task.id)
                                  }
                                >
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskCard
                                      task={task}
                                      onClick={() =>
                                        openModal('editTask', { ...task })
                                      }
                                    />
                                  </div>
                                </ContextMenuTrigger>
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
        <ContextMenu
          isOpen={!!contextMenu}
          position={contextMenu}
          onClose={hideContextMenu}
        >
          <ContextMenuItem onClick={handleDeleteTask}>Delete</ContextMenuItem>
        </ContextMenu>
      </div>
    </main>
  )
}

export default Board
