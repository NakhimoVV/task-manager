import './BoardItem.scss'
import clsx from 'clsx'
import type { Board } from '@/entities/board/model/types.ts'

type BoardItemProps = {
  className?: string
  item: Board
}

const BoardItem = (props: BoardItemProps) => {
  const { className, item } = props

  return (
    <li className={clsx(className, 'board-item')}>
      <span
        className="board-item__circle-image"
        style={{ backgroundColor: item.color }}
      >
        {item.emoji}
      </span>
      <span className="board-item__name">{item.name}</span>
    </li>
  )
}

export default BoardItem
