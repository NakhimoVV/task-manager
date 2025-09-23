import './ButtonToggleCollapse.scss'
import IconClose from '@/shared/assets/icons/Close_round.svg?react'
import IconMenu from '@/shared/assets/icons/Menu.svg?react'
import clsx from 'clsx'

type ButtonToggleCollapseProps = {
  className: string
  isCollapse: boolean
  toggleCollapse: () => void
}

const ButtonToggleCollapse = (props: ButtonToggleCollapseProps) => {
  const { className, isCollapse, toggleCollapse } = props

  const title = isCollapse ? 'Expand menu' : 'Collapse menu'

  return (
    <button
      className={clsx(className, 'button-toggle-collapse')}
      type="button"
      title={title}
      aria-label={title}
      onClick={toggleCollapse}
    >
      {isCollapse ? (
        <IconMenu width={24} height={24} />
      ) : (
        <IconClose width={24} height={24} />
      )}
    </button>
  )
}

export default ButtonToggleCollapse
