import './Button.scss'
import clsx from 'clsx'
import IconPlus from '@/shared/assets/icons/Add_round.svg?react'
import IconDone from '@/shared/assets/icons/Done_round.svg?react'

type ButtonProps = {
  className?: string
  mode?: 'add-task' | 'form-button'
  label: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = (props: ButtonProps) => {
  const { className, mode, label, type = 'button' } = props

  return (
    <button
      className={clsx(className, 'button', {
        [`button--${mode}`]: mode,
        'button--submit': type === 'submit',
        'button--reset': type === 'reset',
      })}
      type={type}
    >
      <span className="button__label">{label}</span>
      <span className="button__icon">
        {mode === 'add-task' && <IconPlus width={24} height={24} />}
        {type === 'submit' && <IconDone width={24} height={24} />}
      </span>
    </button>
  )
}

export default Button
