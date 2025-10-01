import './FieldImage.scss'
import Button from '@/shared/ui/Button'

type FieldImageProps = {}

const FieldImage = (props: FieldImageProps) => {
  const {} = props

  return (
    <div className="field-image">
      <span className="field-image__plug">No cover photo</span>
      <div className="field-image__actions-backdrop">
        <div className="field-image__actions">
          <Button
            className="field-image__actions-button field-image__actions-button--random"
            label="Random Cover"
          />
          <Button
            className="field-image__actions-button field-image__actions-button--remove"
            label="Remove"
          />
        </div>
      </div>
    </div>
  )
}

export default FieldImage
