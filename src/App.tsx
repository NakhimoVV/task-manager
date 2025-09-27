import '@/shared/styles'
import Sidebar from '@/widgets/Sidebar'
import Board from '@/widgets/Board'
import { Toaster } from 'sonner'
import ModalProvider from '@/app/providers/ModalProvider'

function App() {
  return (
    <>
      <h1 className="visually-hidden">Task Manager</h1>
      <Toaster position="bottom-right" richColors />
      <Sidebar />
      <Board />
      <ModalProvider />
    </>
  )
}

export default App
