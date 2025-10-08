import type { ReactNode, MouseEvent, ElementType } from 'react'

interface ContextMenuTriggerProps {
  children: ReactNode
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void
  className?: string
  as?: ElementType
}

export const ContextMenuTrigger = (props: ContextMenuTriggerProps) => {
  const { children, onContextMenu, as: Component = 'div', className } = props

  return (
    <Component className={className} onContextMenu={onContextMenu}>
      {children}
    </Component>
  )
}
