import type { ComponentType } from 'react'
import clsx from 'clsx'
import TagItem from '@/shared/ui/TagItem'
import type { OptionProps } from '@/shared/ui/FieldSelect/model/types.ts'

type WithOptionProps = OptionProps

const withFieldSelectOption =
  (Component: ComponentType<any>) => (props: WithOptionProps) => {
    const { option, isSelected, onClick, isActive, ...rest } = props

    return (
      <Component
        className={clsx('field-select__option', {
          'is-selected': isSelected,
          'is-active': isActive,
        })}
        id={option.value}
        role="option"
        aria-selected={isSelected}
        onClick={() => onClick(option.value)}
        tag={option.value}
        {...rest}
      />
    )
  }

export const TagItemOption = withFieldSelectOption(TagItem)
