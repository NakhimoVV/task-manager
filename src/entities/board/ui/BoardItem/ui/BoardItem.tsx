import './BoardItem.scss'
import type { Board } from '@/entities/board/model/types.ts'
import { useBoardStore } from '@/entities/board/model/store.ts'
import clsx from 'clsx'
import { getImageByEmoji } from '@/shared/config/BOARD_LOGOS.ts'

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
    <button
      className={clsx(className, 'board-item', {
        'is-selected': selectedId === item.id,
      })}
      onClick={handleClick}
    >
      <img
        className="board-item__logo"
        src={getImageByEmoji(item.emoji)}
        alt={item.emoji}
        width={32}
        height={32}
        loading="lazy"
      />
      <span className="board-item__name">{item.name}</span>
    </button>
  )
}

export default BoardItem
