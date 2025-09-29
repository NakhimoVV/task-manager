import './FieldSelect.scss'
import clsx from 'clsx'
import { useState } from 'react'

type FieldSelectProps = {
  className?: string
  label?: string
  name: string
  multiple?: boolean
  options: Array<{ label: string; value: string }>
}

const FieldSelect = (props: FieldSelectProps) => {
  const { className, label, name, multiple = false, options, ...rest } = props
  const [isOpen, setIsOpen] = useState(false)

  const IDs = {
    originalControl: name,
    label: `${name}-label`,
    dropdown: `${name}-dropdown`,
  }

  return (
    <div className={clsx(className, 'field-select')}>
      {label && (
        <label
          className="field-select__label"
          id={IDs.label}
          htmlFor={IDs.originalControl}
        >
          {label}
        </label>
      )}
      <select
        className="field-select__original-control"
        id={IDs.originalControl}
        name={name}
        tabIndex={-1}
        multiple={multiple}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="select__body">
        <div
          className={clsx('field-select__control', {
            'is-open': isOpen,
          })}
          role="combobox"
          onClick={() => setIsOpen((prevState) => !prevState)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={IDs.dropdown}
          aria-labelledby={IDs.label}
          tabIndex={0}
        >
          'label'
        </div>

        {isOpen && (
          <div
            className={clsx('select__dropdown')}
            id={IDs.dropdown}
            role="listbox"
            aria-labelledby={IDs.label}
          >
            {options.map((option, index) => {
              return (
                <div
                  className={clsx('select__option')}
                  id={`${name}-option-${index}`}
                  role="option"
                  key={option.value}
                  aria-selected={option.value === option.value}
                >
                  {option.label}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldSelect
