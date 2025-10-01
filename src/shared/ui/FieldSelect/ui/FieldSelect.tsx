import './FieldSelect.scss'
import clsx from 'clsx'
import { type CSSProperties, useState } from 'react'
import type { Tag } from '@/entities/task/model/types.ts'
import Status from '@/shared/ui/Status'
import TagItem from '@/shared/ui/TagItem'
import tagColors from '@/entities/board/model/tagColors.ts'

export type Option = { label: string; value: string }

type FieldSelectProps = {
  className?: string
  label?: string
  name: string
  multiple?: boolean
  disabled?: boolean
  options: Array<Option>
  value: string | Tag[]
  onChange: (value: string | Tag[]) => void
}
// TODO: проверка на хотябы один селект, и оптимизация стилей тегов
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

  const isArrayValue = Array.isArray(value)

  const selectedOption: Option | Option[] =
    multiple && isArrayValue
      ? options.filter((option) => value.includes(option.value as Tag))
      : options.find((option) => option.value === value) || options[0]

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
        value={multiple ? (value as Tag[]) : (value as string)}
        disabled={disabled}
        onChange={(event) => {
          if (multiple) {
            const selectedOptions = event.target.selectedOptions
            const selectedValues = Array.from(selectedOptions).map(
              (option) => option.value,
            ) as Tag[]

            onChange(selectedValues)
          } else {
            onChange(event.target.value)
          }
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
          {multiple ? (
            (selectedOption as Option[]).map((item) => (
              <TagItem tag={item.label as Tag} key={item.value} />
            ))
          ) : (
            <Status
              mode={(selectedOption as Option).value}
              title={(selectedOption as Option).label || ''}
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
              const isSelected = multiple
                ? (value as Tag[]).includes(option.value as Tag)
                : value === option.value

              const color = tagColors[option.value as Tag]
              return (
                <div
                  className={clsx('field-select__option', {
                    'is-selected': isSelected,
                  })}
                  id={`${name}-option-${option.value}`}
                  role="option"
                  aria-selected={isSelected}
                  style={
                    multiple
                      ? ({
                          '--colorText': color.text,
                          '--colorBackground': color.background,
                        } as CSSProperties)
                      : {}
                  }
                  onClick={() => {
                    if (multiple) {
                      const currentValues = value as Tag[]
                      const optionValue = option.value as Tag

                      const isCurrentlySelected =
                        currentValues.includes(optionValue)

                      const newValues = isCurrentlySelected
                        ? currentValues.filter((v) => v !== optionValue) // Убираем если уже выбран
                        : [...currentValues, optionValue] // Добавляем если не выбран

                      onChange(newValues)
                    } else {
                      onChange(option.value)
                      setIsOpen(false)
                    }
                  }}
                  key={option.value}
                >
                  {multiple ? (
                    <span>{option.label}</span>
                  ) : (
                    <Status title={option.label} mode={option.value} />
                  )}
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
