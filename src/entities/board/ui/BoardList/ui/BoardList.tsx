import './BoardList.scss'
import BoardItem from '@/entities/board/ui/BoardItem'
import IconAddRound from '@/shared/assets/icons/Add_round_fill.svg?react'

type BoardListProps = {}

const list = [
  {
    name: 'Simple Card Board',
    emoji: '🛠️',
    color: '#F9E3E2',
    id: 0,
    link: 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-0.json',
  },
  {
    name: 'Frontend Board',
    emoji: '⚙️',
    color: '#F8D8B0',
    id: 1,
    link: 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-1.json',
  },
  {
    name: 'Design Board',
    emoji: '🚀',
    color: '#FCF097',
    id: 2,
    link: 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-2.json',
  },
  {
    name: 'Learning Board',
    emoji: '⏰',
    color: '#C4DAFB',
    id: 3,
    link: 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-3.json',
  },
]

const BoardList = (props: BoardListProps) => {
  const {} = props

  return (
    <div className="board-list">
      <ul className="board-list__items">
        {list.map((item) => (
          <BoardItem className="board-list__item" item={item} key={item.id} />
        ))}
      </ul>
      <div className="board-list__actions">
        <button className="board-list__button" type="button">
          <IconAddRound width={24} height={24} />
          <span>Add new board</span>
        </button>
      </div>
    </div>
  )
}

export default BoardList
