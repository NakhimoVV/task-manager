import './ThemeSwitcher.scss'
import IconMoon from '@/shared/assets/icons/Moon_fill.svg?react'
import IconSun from '@/shared/assets/icons/Sun_fill.svg?react'
import { useTheme } from '@/shared/hooks/useTheme.ts'
import clsx from 'clsx'

const ThemeSwitcher = () => {
  const switcherId = 'theme-switcher'

  const { theme, toggleTheme } = useTheme()

  return (
    <label
      className={clsx('theme-switcher', {
        'theme-switcher--light': theme === 'light',
      })}
      htmlFor={switcherId}
    >
      <span className="visually-hidden">Switch theme</span>
      <input
        className="theme-switcher__input"
        type="checkbox"
        id={switcherId}
        role="switch"
        checked={theme === 'dark'}
        onChange={(event) =>
          toggleTheme(event.target.checked ? 'dark' : 'light')
        }
      />
      <span className="theme-switcher__body">
        <span
          className={clsx('theme-switcher__button', {
            'is-active': theme === 'dark',
          })}
        >
          <IconMoon width={24} height={24} />
          <span>Dark</span>
        </span>
        <span
          className={clsx('theme-switcher__button', {
            'is-active': theme === 'light',
          })}
        >
          <IconSun width={24} height={24} />
          <span>Light</span>
        </span>
      </span>
    </label>
  )
}

export default ThemeSwitcher
