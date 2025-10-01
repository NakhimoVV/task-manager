import './FieldImage.scss'
import { useState } from 'react'
import Button from '@/shared/ui/Button'

type FieldImageProps = {}

const FieldImage = (props: FieldImageProps) => {
  const {} = props
  const [isHover, setHover] = useState(false)

  return (
    <div
      className="field-image"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!isHover && <span className="field-image__plug">No cover photo</span>}
      {isHover && (
        <div className="field-image__actions-backdrop">
          <div className="field-image__actions">
            <Button label="Random Cover" />
            <Button label="Remove" />
          </div>
        </div>
      )}
    </div>
  )
}

export default FieldImage
