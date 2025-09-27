import './Sidebar.scss'
import ThemeSwitcher from '@/shared/ui/ThemeSwitcher'
import ButtonToggleCollapse from '@/shared/ui/ButtonToggleCollapse'
import { useCollapse } from '@/shared/hooks/useCollapse.ts'
import clsx from 'clsx'
import BoardList from '@/widgets/BoardList'

const Sidebar = () => {
  const { isCollapse, toggleCollapse } = useCollapse()

  return (
    <aside
      className={clsx('sidebar', {
        'is-collapsed': isCollapse,
      })}
    >
      <div className="sidebar__inner">
        <header className="sidebar__header">
          <ButtonToggleCollapse
            className="sidebar__button"
            isCollapse={isCollapse}
            toggleCollapse={toggleCollapse}
          />
        </header>
        <div className="sidebar__body">
          <BoardList />
        </div>
        <footer className="sidebar__footer">
          <ThemeSwitcher />
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
