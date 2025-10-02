import './FieldSelect.scss'
import clsx from 'clsx'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import type { Tag } from '@/entities/task/model/types.ts'
import Status from '@/shared/ui/Status'
import TagItem from '@/shared/ui/TagItem'
import { useClickOutside } from '@/shared/hooks/useClickOutside.ts'
import type { Option } from '@/shared/ui/FieldSelect/model/types.ts'
import { TagItemOption } from '@/shared/ui/FieldSelect/ui/withFieldSelectOption.tsx'
import FieldSelectOption from '@/shared/ui/FieldSelect/ui/FieldSelectOption.tsx'
import { useListboxNavigation } from '@/shared/hooks/useListboxNavigation.ts'

type FieldSelectProps = {
  className?: string
  label?: string
  name: string
  disabled?: boolean
  options: Array<Option>
  multiple?: boolean
}

// TODO: добавить навигацию с клавиатуры

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

    useClickOutside(componentRef, () => setIsOpen(false))

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
        const isAlreadySelected = selectedValues.includes(optionValue)

        // Если выбран последний - не убираем selected
        if (isAlreadySelected && selectedValues.length === 1) {
          return
        }

        const newValues = isAlreadySelected
          ? selectedValues.filter((value) => value !== optionValue)
          : [...selectedValues, optionValue]

        // Обновляем нативный select для синхронизации
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

    const { activeIndex, handleKeyDown } = useListboxNavigation(
      options.map((option) => option.value),
      handleOptionClick,
      multiple,
      setIsOpen,
    )

    const selectedOptions = multiple
      ? options.filter((opt) => selectedValues.includes(opt.value))
      : [options.find((opt) => opt.value === selectedValues[0]) || options[0]]

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
                mode={selectedOptions[0].value}
                title={selectedOptions[0].label}
              />
            ) : (
              selectedOptions.map((item) => (
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
              tabIndex={0}
              aria-activedescendant={options[activeIndex]?.value}
              onKeyDown={handleKeyDown}
            >
              {options.map((option, index) => {
                const isActive = index === activeIndex
                const isSelected = selectedValues.includes(option.value)
                const commonAttrs = {
                  option,
                  isSelected,
                  name,
                  onClick: handleOptionClick,
                  isActive,
                }

                return multiple ? (
                  <TagItemOption key={option.value} {...commonAttrs} />
                ) : (
                  <FieldSelectOption key={option.value} {...commonAttrs}>
                    <Status title={option.label} mode={option.value} />
                  </FieldSelectOption>
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
