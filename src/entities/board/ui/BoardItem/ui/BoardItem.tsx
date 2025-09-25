import './BoardItem.scss'
import clsx from 'clsx'
import type { Board } from '@/entities/board/model/types.ts'
import { useTaskStore } from '@/entities/task/model/store.ts'
import { useBoardStore } from '@/entities/board/model/store.ts'

type BoardItemProps = {
  className?: string
  item: Board
  selectedId?: number
}

const BoardItem = (props: BoardItemProps) => {
  const { className, item, selectedId } = props
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const selectBoard = useBoardStore((state) => state.selectBoard)

  const handleClick = () => {
    selectBoard(item.id)
    void fetchTasks(item.link, item.name)
  }

  return (
    <li className={clsx(className, 'board-item')}>
      <button
        className={clsx('board-item__button', {
          'is-selected': selectedId === item.id,
        })}
        onClick={handleClick}
      >
        <span
          className="board-item__circle-image"
          style={{ backgroundColor: item.color }}
        >
          {item.emoji}
        </span>
        <span className="board-item__name">{item.name}</span>
      </button>
    </li>
  )
}

export default BoardItem
