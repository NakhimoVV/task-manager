import './TaskEditForm.scss'
import Button from '@/shared/ui/Button'
import { useForm } from 'react-hook-form'
import type { Status, Tag, Task } from '@/entities/task/model/types.ts'
import { useModalStore } from '@/shared/store/ModalStore.ts'
import Field from '@/shared/ui/Field'
import FieldSelect from '@/shared/ui/FieldSelect'
import tagList from '@/entities/board/model/tagList.ts'
import { statusList as optionsForStatus } from '@/shared/constants/statusList.ts'

type FormData = Task

const optionsForTags = tagList.map((value) => ({ label: value, value }))

const TaskEditForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      status: 'backlog',
      tags: ['concept'],
    },
  })
  const modalType = useModalStore((state) => state.modalType)
  const closeModal = useModalStore((state) => state.closeModal)

  const statusValue = watch('status')
  const tagsValue = watch('tags')

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
        name="status"
        options={optionsForStatus}
        value={statusValue}
        onChange={(value) => {
          setValue('status', value as Status)
        }}
        // disabled={modalType === 'createTask'}
      />
      <FieldSelect
        className="task-edit-form__tags"
        label="Tags"
        name="tags"
        multiple
        options={optionsForTags}
        value={tagsValue}
        onChange={(value) => {
          setValue('tags', value as Tag[])
        }}
      />
      <div className="task-edit-form__actions">
        <Button
          label={modalType === 'createTask' ? 'Create task' : 'Save'}
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
