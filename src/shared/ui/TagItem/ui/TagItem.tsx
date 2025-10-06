import './TagItem.scss'
import type { CSSProperties } from 'react'
import tagColors from '@/entities/board/model/tagColors.ts'
import type { Tag } from '@/entities/task/model/types.ts'
import clsx from 'clsx'

type TagItemProps = {
  className?: string
  tag: Tag
  as?: 'span' | 'li'
}

const TagItem = (props: TagItemProps) => {
  const { className, tag, as: HtmlTag = 'span', ...rest } = props
  const color = tagColors[tag]

  return (
    <HtmlTag
      className={clsx(className, 'tag-item')}
      style={
        {
          '--colorText': color.text,
          '--colorBackground': color.background,
        } as CSSProperties
      }
      {...rest}
    >
      {tag}
    </HtmlTag>
  )
}

export default TagItem
