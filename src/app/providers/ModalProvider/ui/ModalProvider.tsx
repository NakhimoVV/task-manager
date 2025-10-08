import Modal from '@/shared/ui/Modal'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import BoardCreateForm from '@/features/forms/BoardCreateForm'
import TaskEditForm from '@/features/forms/TaskEditForm'
import type { Task } from '@/entities/task/model/types.ts'

const ModalProvider = () => {
  const type = useModalStore((state) => state.type)
  const payload = useModalStore((state) => state.payload)
  const closeModal = useModalStore((state) => state.closeModal)

  let title: string

  switch (type) {
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

  function isTask(obj: unknown): obj is Task {
    if (typeof obj !== 'object' || obj === null) return false

    return 'status' in obj
  }

  return (
    <Modal title={title} isOpen={!!type} onClose={closeModal}>
      {type === 'createBoard' && <BoardCreateForm />}
      {type === 'editTask' && isTask(payload) && (
        <TaskEditForm initialData={payload} />
      )}
      {type === 'createTask' && <TaskEditForm />}
    </Modal>
  )
}

export default ModalProvider
