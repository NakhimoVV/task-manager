import './ContextMenu.scss'
import { type ReactNode } from 'react'

type ContextMenuItemProps = {
  onClick: () => void
  children: ReactNode
}

const ContextMenuItem = (props: ContextMenuItemProps) => {
  const { onClick, children } = props

  return (
    <button
      className="context-menu__item-button"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default ContextMenuItem
