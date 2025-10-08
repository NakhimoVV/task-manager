import type { ComponentType } from 'react'
import clsx from 'clsx'
import TagItem from '@/shared/ui/TagItem'
import type { OptionProps } from '@/shared/ui/FieldSelect/model/types.ts'

type WithOptionProps = OptionProps

const withFieldSelectOption =
  <P extends object>(Component: ComponentType<P>) =>
  (props: WithOptionProps & Omit<P, keyof WithOptionProps>) => {
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
        {...(rest as P)}
      />
    )
  }

export const TagItemOption = withFieldSelectOption(TagItem)
