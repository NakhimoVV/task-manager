export type Option = { label: string; value: string }

export type OptionProps = {
  option: Option
  isSelected: boolean
  name: string
  onClick: (value: string) => void
}
