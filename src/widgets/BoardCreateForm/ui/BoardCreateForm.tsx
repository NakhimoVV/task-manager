import './BoardCreateForm.scss'
import Button from '@/shared/ui/Button'

type BoardCreateFormProps = {}

const BoardCreateForm = (props: BoardCreateFormProps) => {
  const {} = props

  return (
    <form className="board-create-form">
      {/*TODO: Разобраться с полями*/}
      <label htmlFor="">
        <input id="" name="" />
      </label>
      <label htmlFor="">
        {/*map*/}
        <input type="radio" id="" name="" />
      </label>
      <div className="board-create-form__actions">
        <Button label="Create board" type="submit" mode="form-button" />
        <Button label="Cancel" type="reset" mode="form-button" />
      </div>
    </form>
  )
}

export default BoardCreateForm
