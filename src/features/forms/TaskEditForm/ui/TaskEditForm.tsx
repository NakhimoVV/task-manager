import Button from '@/shared/ui/Button'
import { Controller, useForm } from 'react-hook-form'
import type { Task } from '@/entities/task/model/types.ts'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import Field from '@/shared/ui/Field'
import FieldSelect from '@/shared/ui/FieldSelect'
import tagList from '@/entities/board/model/tagList.ts'
import { statusList as optionsForStatus } from '@/shared/constants/statusList.ts'
import FieldImage from '@/shared/ui/FieldImage'
import { useTaskStore } from '@/entities/task/model/store.ts'

type FormData = Task

const optionsForTags = tagList.map((value) => ({ label: value, value }))

type TaskEditFormProps = {
  initialData?: Task
}

const TaskEditForm = (props: TaskEditFormProps) => {
  const { initialData } = props
  const { register, control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: initialData ?? {
      background: null,
      status: 'backlog',
      tags: ['concept'],
    },
  })
  const modalType = useModalStore((state) => state.type)
  const closeModal = useModalStore((state) => state.closeModal)
  const addTask = useTaskStore((state) => state.addTask)
  const updateTask = useTaskStore((state) => state.updateTask)

  const isCreateForm = modalType === 'createTask'

  const onSubmit = (data: FormData) => {
    const trimmedTitle = data.title.trim()
    const correctData = {
      ...data,
      title: trimmedTitle,
      status: isCreateForm ? 'backlog' : data.status,
    }

    if (isCreateForm) {
      addTask(correctData)
    } else if (initialData) {
      updateTask({ ...initialData, ...correctData })
    }

    reset()
    closeModal()
  }

  return (
    <form className="task-edit-form form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <FieldImage {...field} />}
        name="background"
        control={control}
      />
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
        {...register('status', { disabled: isCreateForm })}
      />
      <FieldSelect
        className="task-edit-form__tags"
        label="Tags"
        multiple
        options={optionsForTags}
        {...register('tags')}
      />
      <div className="task-edit-form__actions form__actions">
        <Button
          label={isCreateForm ? 'Create task' : 'Save'}
          type="submit"
          mode="form-button"
        />
        <Button
          label="Cancel"
          type="reset"
          mode="form-button"
          onClick={() => closeModal()}
        />
      </div>
    </form>
  )
}

export default TaskEditForm
