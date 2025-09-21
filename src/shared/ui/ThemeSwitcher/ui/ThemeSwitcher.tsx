import './ThemeSwitcher.scss'
import MoonIcon from '@/shared/assets/icons/Moon_fill.svg?react'
import SunIcon from '@/shared/assets/icons/Sun_fill.svg?react'
import { useTheme } from '@/shared/hooks/useTheme.ts'
import clsx from 'clsx'

const ThemeSwitcher = () => {
  const switcherId = 'theme-switcher'

  const [theme, setTheme] = useTheme()

  const handleToggle = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  return (
    <label className="theme-switcher" htmlFor={switcherId}>
      <span className="visually-hidden">Switch theme</span>
      <input
        className="theme-switcher__input"
        type="checkbox"
        id={switcherId}
        role="switch"
        checked={theme === 'dark'}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
      <span className="theme-switcher__body">
        <span
          className={clsx('theme-switcher__button', {
            'is-active': theme === 'dark',
          })}
        >
          <MoonIcon width={24} height={24} />
          Dark
        </span>
        <span
          className={clsx('theme-switcher__button', {
            'is-active': theme === 'light',
          })}
        >
          <SunIcon width={24} height={24} />
          Light
        </span>
      </span>
    </label>
  )
}

export default ThemeSwitcher
