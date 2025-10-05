import type { ReactNode, MouseEvent } from 'react'

interface ContextMenuTriggerProps {
  children: ReactNode
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void
}

export const ContextMenuTrigger = (props: ContextMenuTriggerProps) => {
  const { children, onContextMenu } = props

  return <div onContextMenu={onContextMenu}>{children}</div>
}
