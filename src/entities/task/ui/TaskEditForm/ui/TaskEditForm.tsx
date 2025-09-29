import './TaskEditForm.scss'
import Button from '@/shared/ui/Button'
import { useForm } from 'react-hook-form'
import type { Status, Task } from '@/entities/task/model/types.ts'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import Field from '@/shared/ui/Field'
import FieldSelect from '@/shared/ui/FieldSelect'
import tagList from '@/entities/board/model/tagList.ts'

type FormData = Task

const optionsForStatus: { label: string; value: Status }[] = [
  {
    label: 'Backlog',
    value: 'backlog',
  },
  {
    label: 'In Progress',
    value: 'in-progress',
  },
  {
    label: 'In Review',
    value: 'in-review',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
]

const optionsForTags = tagList.map((value) => ({ label: value, value }))

const TaskEditForm = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const modalType = useModalStore((state) => state.modalType)

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form className="task-edit-form" onSubmit={handleSubmit(onSubmit)}>
      {/*FieldImage*/}
      <Field
        className="task-edit-form__title"
        label="Task name"
        placeholder="e.g: Default task"
        {...register('title')}
      />
      <FieldSelect
        className="task-edit-form__status"
        label="Status"
        options={optionsForStatus}
        {...register('status')}
      />
      <FieldSelect
        className="task-edit-form__tags"
        label="Tags"
        multiple
        options={optionsForTags}
        {...register('tags')}
      />
      <div className="task-edit-form__actions">
        <Button
          label={modalType === 'createTask' ? 'Create task' : 'Save'}
          type="submit"
          mode="form-button"
        />
        <Button label="Cancel" type="reset" mode="form-button" />
      </div>
    </form>
  )
}

export default TaskEditForm
