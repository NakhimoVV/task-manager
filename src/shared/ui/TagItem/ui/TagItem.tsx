import './TagItem.scss'
import type { CSSProperties } from 'react'
import tagColors from '@/entities/board/model/tagColors.ts'
import type { Tag } from '@/entities/task/model/types.ts'

type TagItemProps = {
  tag: Tag
}

const TagItem = (props: TagItemProps) => {
  const { tag, ...rest } = props
  const color = tagColors[tag]

  return (
    <span
      className="tag-item"
      style={
        {
          '--colorText': color.text,
          '--colorBackground': color.background,
        } as CSSProperties
      }
      {...rest}
    >
      {tag}
    </span>
  )
}

export default TagItem
