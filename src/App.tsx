import '@/shared/styles'
import Sidebar from '@/widgets/Sidebar'
import Board from '@/widgets/Board'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <h1 className="visually-hidden">Task Manager</h1>
      <Toaster position="bottom-right" richColors />
      <Sidebar />
      <Board />
    </>
  )
}

export default App
