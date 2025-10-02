import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { OptionProps } from '@/shared/ui/FieldSelect/model/types.ts'

type FieldSelectOptionProps = OptionProps & {
  children: ReactNode
}

const FieldSelectOption = (props: FieldSelectOptionProps) => {
  const { option, isSelected, name, onClick, children } = props

  return (
    <div
      className={clsx('field-select__option', { 'is-selected': isSelected })}
      id={`${name}-option-${option.value}`}
      role="option"
      aria-selected={isSelected}
      onClick={() => onClick(option.value)}
    >
      {children}
    </div>
  )
}
export default FieldSelectOption
