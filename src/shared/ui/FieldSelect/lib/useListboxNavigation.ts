import {
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export const useListboxNavigation = (
  options: string[],
  onSelect: (value: string) => void,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  initialIndex: number,
) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex)

  const controlRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const scrollToActiveIndex = useCallback(() => {
    if (!dropdownRef.current) {
      return
    }
    const activeOption = dropdownRef.current.querySelector('.is-active')

    if (activeOption) {
      activeOption.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [])

  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          }
          setActiveIndex((prev) => (prev + 1) % options.length)
          setTimeout(scrollToActiveIndex, 0)
          break
        case 'ArrowUp':
          event.preventDefault()
          setActiveIndex((prev) => (prev - 1 + options.length) % options.length)
          setTimeout(scrollToActiveIndex, 0)
          break
        case 'Home':
          event.preventDefault()
          setActiveIndex(0)
          setTimeout(scrollToActiveIndex, 0)
          break
        case 'End':
          event.preventDefault()
          setActiveIndex(options.length - 1)
          setTimeout(scrollToActiveIndex, 0)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            onSelect(options[activeIndex])
          }
          break
        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          break
        case 'Tab':
          setIsOpen(false)
          break
      }
    },
    [isOpen, setIsOpen, activeIndex, onSelect, options, scrollToActiveIndex],
  )

  return { activeIndex, handleKeyDown, controlRef, dropdownRef }
}
