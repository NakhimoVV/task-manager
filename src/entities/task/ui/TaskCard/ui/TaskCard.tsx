import './TaskCard.scss'
import type { Task } from '@/entities/task/model/types.ts'
import clsx from 'clsx'

type TaskCardProps = {
  task: Task
}

const TaskCard = (props: TaskCardProps) => {
  const { task } = props

  return (
    <article className="task-card">
      {task.background && (
        <div className="task-card__image-wrapper">
          <img
            className="task-card__image"
            src={task.background}
            alt=""
            height={77}
            loading="lazy"
          />
        </div>
      )}
      <h4 className="task-card__title">{task.title}</h4>
      <div className="task-card__tag-list">
        {task.tags.map((tag) => (
          <span
            className={clsx(
              'task-card__tag-item',
              `task-card__tag-item--${tag}`,
            )}
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export default TaskCard
