import './FieldSelect.scss'
import clsx from 'clsx'
import { useState } from 'react'
import type { Tag } from '@/entities/task/model/types.ts'
import Status from '@/shared/ui/Status'

type FieldSelectProps = {
  className?: string
  label?: string
  name: string
  multiple?: boolean
  disabled?: boolean
  options: Array<{ label: string; value: string }>
  value: string | Tag[]
  onChange: (value: string | Tag[]) => void
}

const FieldSelect = (props: FieldSelectProps) => {
  const {
    className,
    label,
    name,
    multiple = false,
    disabled = false,
    options,
    value,
    onChange,
    ...rest
  } = props
  const [isOpen, setIsOpen] = useState(false)

  const IDs = {
    originalControl: name,
    label: `${name}-label`,
    dropdown: `${name}-dropdown`,
  }

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div
      className={clsx(className, 'field-select', {
        'field-select--multiple': multiple,
      })}
    >
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
        size={multiple ? 4 : 1}
        value={value ?? ''}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="field-select__body">
        <button
          className={clsx('field-select__control', {
            'is-open': isOpen,
          })}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={IDs.dropdown}
          aria-labelledby={IDs.label}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {Array.isArray(value) ? (
            value.map((item) => <span key={item}>{item}</span>)
          ) : (
            <Status
              mode={selectedOption?.value}
              title={selectedOption?.label || ''}
            />
          )}
        </button>

        {isOpen && (
          <div
            className={clsx('field-select__dropdown', {
              'is-open': isOpen,
            })}
            id={IDs.dropdown}
            role="listbox"
            aria-labelledby={IDs.label}
          >
            {options.map((option) => {
              const isSelected = value === option.value

              return (
                <div
                  className={clsx('field-select__option', {
                    'is-selected': isSelected,
                  })}
                  id={`${name}-option-${option.value}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  key={option.value}
                >
                  <Status title={option.label} mode={option.value} />
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
