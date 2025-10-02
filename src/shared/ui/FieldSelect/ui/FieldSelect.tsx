import './FieldSelect.scss'
import clsx from 'clsx'
import {
  type CSSProperties,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Tag } from '@/entities/task/model/types.ts'
import Status from '@/shared/ui/Status'
import TagItem from '@/shared/ui/TagItem'
import tagColors from '@/entities/board/model/tagColors.ts'
import { useClickOutside } from '@/shared/hooks/useClickOutside.ts'

export type Option = { label: string; value: string }

type FieldSelectProps = {
  className?: string
  label?: string
  name: string
  disabled?: boolean
  options: Array<Option>
  multiple?: boolean
}

// TODO: проверка на хотябы один селект, и оптимизация стилей тегов,
//  react-hook-form + controlled input, хотя можно оставить одно,
//  вынос в <FieldSelectOption /><FieldSelectDropdown />

const FieldSelect = forwardRef<HTMLSelectElement, FieldSelectProps>(
  (props, ref) => {
    const {
      className,
      label,
      name,
      multiple = false,
      disabled = false,
      options,
      ...rest
    } = props

    const selectRef = useRef<HTMLSelectElement>(null)
    const componentRef = useRef<HTMLDivElement>(null)
    const setRef = (node: HTMLSelectElement) => {
      selectRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    useEffect(() => {
      const updateFromNativeSelect = () => {
        if (!selectRef.current) {
          return
        }

        if (multiple) {
          const values = Array.from(selectRef.current.selectedOptions).map(
            (opt) => opt.value,
          )
          setSelectedValues(values)
        } else {
          const value = selectRef.current.value

          setSelectedValues(value ? [value] : [])
        }
      }

      const select = selectRef.current
      if (select) {
        select.addEventListener('change', updateFromNativeSelect)
        updateFromNativeSelect()

        return () => {
          select.removeEventListener('change', updateFromNativeSelect)
        }
      }
    }, [multiple])

    useClickOutside(componentRef, () => setIsOpen(false))

    const IDs = {
      originalControl: name,
      label: `${name}-label`,
      dropdown: `${name}-dropdown`,
    }

    const optionList = useMemo(
      () =>
        options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        )),
      [options],
    )

    const handleOptionClick = (optionValue: string) => {
      if (!selectRef.current) {
        return
      }

      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue]

        // Обновляем нативный select
        Array.from(selectRef.current.options).forEach((option) => {
          option.selected = newValues.includes(option.value)
        })

        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }))
      } else {
        selectRef.current.value = optionValue
        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }))
        setIsOpen(false)
      }
    }

    const getSelectedOptions = () => {
      if (multiple) {
        return options.filter((opt) => selectedValues.includes(opt.value))
      } else {
        // Для single режима берем первое значение из массива
        const selectedValue = selectedValues[0]
        return selectedValue
          ? [options.find((opt) => opt.value === selectedValue) || options[0]]
          : [options[0]] // fallback
      }
    }

    const selectedOption = getSelectedOptions()
    const isSingleMode = !multiple

    return (
      <div
        className={clsx(className, 'field-select', {
          'field-select--multiple': multiple,
        })}
        ref={componentRef}
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
          ref={setRef}
          className="field-select__original-control"
          id={IDs.originalControl}
          name={name}
          tabIndex={-1}
          multiple={multiple}
          size={multiple ? 4 : 1}
          disabled={disabled}
          {...rest}
        >
          {optionList}
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
            {isSingleMode ? (
              <Status
                mode={selectedOption[0].value}
                title={selectedOption[0].label}
              />
            ) : (
              (selectedOption as Option[]).map((item) => (
                <TagItem tag={item.label as Tag} key={item.value} />
              ))
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
                const isSelected = selectedValues.includes(option.value)

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
                    onClick={() => handleOptionClick(option.value)}
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
  },
)

FieldSelect.displayName = 'FieldSelect'

export default FieldSelect
