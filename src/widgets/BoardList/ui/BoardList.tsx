import './BoardList.scss'
import BoardItem from '@/entities/board/ui/BoardItem'
import IconAddRound from '@/shared/assets/icons/Add_round_fill.svg?react'
import { useBoardStore } from '@/entities/board/model/store.ts'
import { useEffect } from 'react'
import { useTaskStore } from '@/entities/task/model/store.ts'
import { toast } from 'sonner'
import { useModalStore } from '@/shared/store/ModalStore.ts'

const BoardList = () => {
  const list = useBoardStore((state) => state.boards)
  const selectedBoardId = useBoardStore((state) => state.selectedBoardId)
  const isLoading = useBoardStore((state) => state.isLoading)
  const error = useBoardStore((state) => state.errorMessage)
  const fetchBoards = useBoardStore((state) => state.fetchBoards)
  const setTasks = useTaskStore((state) => state.setTasks)
  const fetchTasksForBoard = useBoardStore((state) => state.fetchTasksForBoard)
  const tasksCache = useBoardStore((state) => state.tasksByBoard)
  const openModal = useModalStore((state) => state.openModal)

  useEffect(() => {
    void fetchBoards()
  }, [fetchBoards])

  useEffect(() => {
    if (selectedBoardId === undefined) {
      return
    }

    const cached = tasksCache[selectedBoardId]
    if (cached) {
      setTasks(cached)
      return
    }

    void fetchTasksForBoard(selectedBoardId)
  }, [selectedBoardId, tasksCache, setTasks, fetchTasksForBoard])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <nav className="board-list">
      <ul className="board-list__items">
        {list.map((item) => (
          <BoardItem
            className="board-list__item"
            item={item}
            selectedId={selectedBoardId}
            key={item.id}
          />
        ))}
      </ul>
      <div className="board-list__actions">
        <button
          className="board-list__button"
          type="button"
          onClick={() => openModal('createBoard')}
        >
          <IconAddRound width={24} height={24} />
          <span>Add new board</span>
        </button>
      </div>
    </nav>
  )
}

export default BoardList
