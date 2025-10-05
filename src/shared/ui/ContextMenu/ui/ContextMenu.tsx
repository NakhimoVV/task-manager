import './ContextMenu.scss'
import { type ReactNode, useEffect } from 'react'

type ContextMenuProps = {
  isOpen: boolean
  position: { x: number; y: number } | null
  onClose: () => void
  children: ReactNode
}

const ContextMenu = (props: ContextMenuProps) => {
  const { isOpen, position, onClose, children } = props

  useEffect(() => {
    const handleClick = () => {
      if (isOpen) {
        onClose()
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [isOpen, onClose])

  if (!isOpen || !position) {
    return null
  }

  return (
    <div
      className="context-menu"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 'var(--z-index-content)',
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="context-menu__content">{children}</div>
    </div>
  )
}

export default ContextMenu
