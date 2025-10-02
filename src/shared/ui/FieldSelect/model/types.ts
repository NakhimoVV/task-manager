export type Option = { label: string; value: string }

export type OptionProps = {
  option: Option
  isSelected: boolean
  onClick: (value: string) => void
  isActive: boolean
}
