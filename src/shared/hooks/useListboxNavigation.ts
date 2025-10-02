import { type KeyboardEventHandler, useCallback, useState } from 'react'

export const useListboxNavigation = (
  options: string[],
  onSelect: (value: string) => void,
  multiple: boolean = false,
  setIsOpen: (value: boolean) => void,
) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setActiveIndex((prev) => (prev + 1) % options.length)
          break
        case 'ArrowUp':
          event.preventDefault()
          setActiveIndex((prev) => (prev - 1 + options.length) % options.length)
          break
        case 'Home':
          event.preventDefault()
          setActiveIndex(0)
          break
        case 'End':
          event.preventDefault()
          setActiveIndex(options.length - 1)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          onSelect(options[activeIndex])
          break
        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [options, activeIndex, onSelect],
  )

  return { activeIndex, handleKeyDown }
}
