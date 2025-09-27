import './BoardCreateForm.scss'
import Button from '@/shared/ui/Button'

type BoardCreateFormProps = {}

const BoardCreateForm = (props: BoardCreateFormProps) => {
  const {} = props

  return (
    <form className="board-create-form">
      <label htmlFor="">
        <input id="" name="" />
      </label>
      <label htmlFor="">
        {/*map*/}
        <input type="radio" id="" name="" />
      </label>
      <div className="board-create-form__actions">
        <Button label="Create board" />
        <Button label="Cancel" />
      </div>
    </form>
  )
}

export default BoardCreateForm
