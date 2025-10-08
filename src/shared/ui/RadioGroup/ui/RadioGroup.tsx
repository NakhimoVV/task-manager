import './RadioGroup.scss'
import clsx from 'clsx'
import type {
  BoardLogoEmoji,
  BoardLogosType,
} from '@/shared/config/BOARD_LOGOS.ts'

type RadioGroupProps = {
  className?: string
  label: string
  logoList: BoardLogosType
  value: BoardLogoEmoji
}

const RadioGroup = (props: RadioGroupProps) => {
  const { className, label, logoList, value, ...rest } = props

  return (
    <fieldset className={clsx(className, 'radio-group')}>
      <legend className="radio-group__legend visually-hidden">{label}</legend>
      <p className="radio-group__label" aria-hidden>
        {label}
      </p>
      <div className="radio-group__list">
        {logoList.map((logo) => (
          <label className="radio-group__item" key={logo.emoji}>
            <input
              className="radio-group__input"
              type="radio"
              value={logo.emoji}
              checked={logo.emoji === value}
              {...rest}
            />
            <span className="radio-group__image-wrapper">
              <img
                className="radio-group__image"
                src={logo.image}
                alt=""
                width={32}
                height={32}
              />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default RadioGroup
