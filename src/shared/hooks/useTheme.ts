import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export const useTheme = (): [string, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme
    return saved || 'auto'
  })

  // Определяем реальную тему
  const actualTheme =
    theme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

  useEffect(() => {
    localStorage.setItem('theme', theme)

    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }

    document.documentElement.style.colorScheme = actualTheme
  }, [theme, actualTheme])

  // Слушаем изменения системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'auto') {
        // Форсируем обновление
        setTheme((prev) => (prev === 'auto' ? 'auto' : prev))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return [actualTheme, setTheme]
}
