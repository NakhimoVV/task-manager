import './Status.scss'
import clsx from 'clsx'

type StatusProps = {
  mode?: string
  title: string
  count?: number
}

const Status = (props: StatusProps) => {
  const { title, count, mode } = props

  return (
    <div
      className={clsx('status', {
        [`status--${mode}`]: mode,
      })}
    >
      <span className="status__led"></span>
      <span className="status__label">
        {count ? `${title} (${count})` : title}
      </span>
    </div>
  )
}

export default Status
