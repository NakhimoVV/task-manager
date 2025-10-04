import './FieldImage.scss'
import Button from '@/shared/ui/Button'
import { randomCover } from '@/shared/lib/randomCover.ts'

type FieldImageProps = {
  value: string | null
  onChange: (value: string | null) => void
}

const FieldImage = (props: FieldImageProps) => {
  const { value, onChange } = props

  const handleRandom = () => {
    const newBackground = randomCover()
    onChange(newBackground)
  }

  const handleRemove = () => {
    onChange(null)
  }

  return (
    <div
      className="field-image"
      style={value ? { backgroundImage: `url(${value})` } : undefined}
    >
      {!value && <span className="field-image__plug">No cover photo</span>}
      <div className="field-image__actions-backdrop">
        <div className="field-image__actions">
          <Button
            className="field-image__actions-button field-image__actions-button--random"
            label="Random Cover"
            onClick={handleRandom}
          />
          <Button
            className="field-image__actions-button field-image__actions-button--remove"
            label="Remove"
            onClick={handleRemove}
          />
        </div>
      </div>
    </div>
  )
}

export default FieldImage
