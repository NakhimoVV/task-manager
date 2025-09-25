import './BoardList.scss'
import BoardItem from '@/entities/board/ui/BoardItem'
import IconAddRound from '@/shared/assets/icons/Add_round_fill.svg?react'
import { useBoardStore } from '@/entities/board/model/store.ts'
import { useEffect } from 'react'
import { useTaskStore } from '@/entities/task/model/store.ts'

const BoardList = () => {
  const list = useBoardStore((state) => state.boards)
  const fetchBoards = useBoardStore((state) => state.fetchBoards)
  const selectedBoardId = useBoardStore((state) => state.selectedBoardId)
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const selectBoard = list.find((board) => board.id === selectedBoardId)

  // TODO: добавить отображение isLoading & error

  useEffect(() => {
    void fetchBoards()
  }, [fetchBoards])

  useEffect(() => {
    if (selectBoard) {
      void fetchTasks(selectBoard.link, selectBoard.name)
    }
  }, [selectBoard, fetchTasks])

  return (
    <nav className="board-list">
      <ul className="board-list__items">
        {list.map((item) => (
          <BoardItem
            className="board-list__item"
            item={item}
            selectedId={selectedBoardId ?? 0}
            key={item.id}
          />
        ))}
      </ul>
      <div className="board-list__actions">
        <button className="board-list__button" type="button">
          <IconAddRound width={24} height={24} />
          <span>Add new board</span>
        </button>
      </div>
    </nav>
  )
}

export default BoardList
