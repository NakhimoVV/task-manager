import './TaskCard.scss'
import type { Task } from '@/entities/task/model/types.ts'
import TagItem from '@/shared/ui/TagItem'

type TaskCardProps = {
  task: Task
  onClick?: () => void
}

const TaskCard = (props: TaskCardProps) => {
  const { task, onClick } = props
  // Сделать карточку интерактивной с помощью role/ button
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
      <h3 className="task-card__title">{task.title}</h3>
      <ul className="task-card__tag-list">
        {task.tags.map((tag) => (
          <TagItem
            className="task-card__tag-item"
            tag={tag}
            as="li"
            key={tag}
          />
        ))}
      </ul>
    </article>
  )
}

export default TaskCard
