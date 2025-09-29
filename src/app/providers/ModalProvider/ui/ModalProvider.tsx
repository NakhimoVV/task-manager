import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import BoardCreateForm from '@/widgets/BoardCreateForm'
import TaskEditForm from '@/entities/task/ui/TaskEditForm'

const ModalProvider = () => {
  const { modalType, closeModal } = useModalStore()

  let title: string

  switch (modalType) {
    case 'createBoard':
      title = 'New board'
      break

    case 'editTask':
      title = 'Task details'
      break

    case 'createTask':
      title = 'New task'
      break

    default:
      title = ''
      break
  }

  return (
    <Modal title={title} isOpen={!!modalType} onClose={closeModal}>
      {modalType === 'createBoard' && <BoardCreateForm />}
      {/*{modalType === 'editTask' && <TaskEditForm />}*/}
      {modalType === 'createTask' && <TaskEditForm />}
    </Modal>
  )
}

export default ModalProvider
