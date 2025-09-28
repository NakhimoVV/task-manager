import './Field.scss'
import clsx from 'clsx'

type FieldProps = {
  className?: string
  label?: string
  name: string
  placeholder?: string
  type?: string
  error?: string
}

const Field = (props: FieldProps) => {
  const {
    className,
    label,
    name,
    placeholder,
    type = 'text',
    error,
    ...rest
  } = props

  return (
    <div className={clsx(className, 'field')}>
      {label && (
        <label className="field__label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={clsx('field__input', { 'field__input--error': error })}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  )
}

export default Field
