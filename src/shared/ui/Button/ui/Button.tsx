import './Button.scss'
import clsx from 'clsx'
import IconPlus from '@/shared/assets/icons/Add_round.svg?react'

type ButtonProps = {
  className?: string
  mode?: 'add-task'
  label: string
}

const Button = (props: ButtonProps) => {
  const { className, mode, label } = props

  return (
    <button
      className={clsx(className, 'button', {
        [`button--${mode}`]: mode === 'add-task',
      })}
    >
      <span className="button__label">{label}</span>
      <span className="button__icon">
        {mode === 'add-task' && <IconPlus width={24} height={24} />}
      </span>
    </button>
  )
}

export default Button
