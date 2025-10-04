import './TaskCard.scss'
import type { Task } from '@/entities/task/model/types.ts'
import tagColors from '@/entities/board/model/tagColors.ts'
import { type CSSProperties } from 'react'
type TaskCardProps = {
  task: Task
  onClick?: () => void
}

const TaskCard = (props: TaskCardProps) => {
  const { task, onClick } = props

  return (
    <article className="task-card" onClick={onClick}>
      {task.background && (
        <div className="task-card__image-wrapper">
          <img
            className="task-card__image"
            src={task.background}
            alt=""
            height={77}
            loading="lazy"
            role="presentation"
          />
        </div>
      )}
      <h4 className="task-card__title">{task.title}</h4>
      <div className="task-card__tag-list">
        {task.tags.map((tag) => {
          const color = tagColors[tag]
          // TODO: замена на TagItem
          return (
            <span
              className="task-card__tag-item"
              style={
                {
                  '--colorText': color.text,
                  '--colorBackground': color.background,
                } as CSSProperties
              }
              key={tag}
            >
              {tag}
            </span>
          )
        })}
      </div>
    </article>
  )
}

export default TaskCard
