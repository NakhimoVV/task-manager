import { useEffect, useState } from 'react'

export const useCollapse = () => {
  const localStorageCollapseValue = localStorage.getItem('sidebar-collapse')

  const [isCollapse, setIsCollapse] = useState(
    localStorageCollapseValue === 'true',
  )

  useEffect(() => {
    localStorage.setItem('sidebar-collapse', String(isCollapse))
  }, [isCollapse])

  function toggleCollapse() {
    setIsCollapse((prevState) => !prevState)
  }

  return { isCollapse, toggleCollapse }
}
