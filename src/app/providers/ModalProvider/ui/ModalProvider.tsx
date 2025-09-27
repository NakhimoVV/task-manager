import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import BoardCreateForm from '@/widgets/BoardCreateForm'

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

    default:
      title = ''
      break
  }

  return (
    <Modal title={title} isOpen={!!modalType} onClose={closeModal}>
      {modalType === 'createBoard' && <BoardCreateForm />}
      {/*{modalType === 'editTask' && <TaskEditForm />}*/}
    </Modal>
  )
}

export default ModalProvider
