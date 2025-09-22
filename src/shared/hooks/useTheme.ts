import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const localStorageTheme = localStorage.getItem('theme') as Theme
  const [theme, setTheme] = useState<Theme>(localStorageTheme ?? '')

  useEffect(() => {
    if (localStorageTheme) {
      setTheme(localStorageTheme)
      document.documentElement.setAttribute('data-theme', localStorageTheme)
    } else {
      const isPreferDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const initialTheme = isPreferDark ? 'dark' : 'light'
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    }
  }, [])

  function toggleTheme(newTheme?: Theme) {
    const nextTheme: Theme = newTheme ?? (theme === 'light' ? 'dark' : 'light')
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return { theme, toggleTheme }
}
