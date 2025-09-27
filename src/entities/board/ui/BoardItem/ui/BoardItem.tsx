import './BoardItem.scss'
import type { Board } from '@/entities/board/model/types.ts'
import { useBoardStore } from '@/entities/board/model/store.ts'
import clsx from 'clsx'

type BoardItemProps = {
  className?: string
  item: Board
  selectedId?: number
}

const BoardItem = (props: BoardItemProps) => {
  const { className, item, selectedId } = props
  const selectBoard = useBoardStore((state) => state.selectBoard)

  const handleClick = () => {
    selectBoard(item.id)
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
