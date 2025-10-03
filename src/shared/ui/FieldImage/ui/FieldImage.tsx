import './FieldImage.scss'
import Button from '@/shared/ui/Button'
import { useRef, useState } from 'react'
import { randomCover } from '@/shared/lib/randomCover.ts'

type FieldImageProps = {
  name: string
}

const FieldImage = (props: FieldImageProps) => {
  const { name, ...rest } = props
  const [background, setBackground] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRandom = () => {
    const newBackground = randomCover()
    setBackground(newBackground)

    if (inputRef.current) {
      inputRef.current.value = newBackground
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  const handleRemove = () => {
    setBackground(null)

    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  return (
    <div
      className="field-image"
      style={background ? { backgroundImage: `url(${background})` } : undefined}
    >
      <label className="visually-hidden" htmlFor={name}>
        FileImage
      </label>
      <input
        className="field-image__input"
        ref={inputRef}
        id={name}
        name={name}
        type="url"
        // tabIndex={-1}
        {...rest}
      />
      {!background && <span className="field-image__plug">No cover photo</span>}
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
