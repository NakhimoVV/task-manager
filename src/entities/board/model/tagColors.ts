import tagList from '@/entities/board/model/tagList.ts'

type TagName = (typeof tagList)[number]
type TagColors = Record<TagName, { text: string; background: string }>

const colorOrder = ['red', 'blue', 'yellow', 'green'] as const

const tagColors: TagColors = tagList.reduce((acc, tag, index) => {
  const color = colorOrder[index % colorOrder.length]

  acc[tag] = {
    text: `var(--color-${color})`,
    background: `var(--color-${color}-light)`,
  }
  return acc
}, {} as TagColors)

export default tagColors
