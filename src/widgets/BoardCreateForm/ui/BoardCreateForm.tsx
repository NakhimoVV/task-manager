import './BoardCreateForm.scss'
import Button from '@/shared/ui/Button'
import Field from '@/shared/ui/Field'
import { useForm } from 'react-hook-form'
import type { Board } from '@/entities/board/model/types.ts'
import { BOARD_LOGOS } from '@/shared/config/BOARD_LOGOS.ts'
import RadioGroup from '@/shared/ui/RadioGroup'
import generateId from '@/shared/lib/generateId.ts'
import { useModalStore } from '@/shared/store/ModalStore.ts'

type FormData = Omit<Board, 'link' | 'color'>

const logos = [...BOARD_LOGOS].reverse()

const BoardCreateForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      emoji: logos[0].emoji,
    },
  })
  const closeModal = useModalStore((state) => state.closeModal)
  const emojiValue = watch('emoji')

  const onSubmit = (data: FormData) => {
    const resultName = data.name.trim() === '' ? 'Default Board' : data.name
    console.log('Create board:', {
      ...data,
      name: resultName,
      id: generateId(),
    })
    reset()
    closeModal()
  }

  return (
    <form className="board-create-form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        className="board-create-form__name"
        label="Board name"
        placeholder="e.g: Default Board"
        {...register('name')}
      />
      <RadioGroup
        className="board-create-form__radio-group"
        label="Logo"
        logoList={logos}
        {...register('emoji')}
        value={emojiValue}
      />
      <div className="board-create-form__actions">
        <Button label="Create board" type="submit" mode="form-button" />
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

export default BoardCreateForm
