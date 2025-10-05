import React, { useCallback, useState } from 'react'

type ContextMenuPosition = {
  x: number
  y: number
}

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
    null,
  )

  const showContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    })
  }, [])

  const hideContextMenu = useCallback(() => setContextMenu(null), [])

  return {
    contextMenu,
    showContextMenu,
    hideContextMenu,
  }
}
