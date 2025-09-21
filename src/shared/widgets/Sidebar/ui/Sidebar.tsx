import './Sidebar.scss'
import ThemeSwitcher from '@/shared/ui/ThemeSwitcher'

type SidebarProps = {}

const Sidebar = (props: SidebarProps) => {
  const {} = props

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <header className="sidebar__header"></header>
        <div className="sidebar__body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, beatae
          consectetur delectus distinctio fugiat laborum quo rerum vel. Autem
          facilis harum hic ipsam necessitatibus obcaecati odio quis soluta
          ullam veritatis.
        </div>
        <footer className="sidebar__footer">
          <ThemeSwitcher />
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
