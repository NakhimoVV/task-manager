import logo_01 from '@/shared/assets/images/emojis/board-logo-01.png'
import logo_02 from '@/shared/assets/images/emojis/board-logo-02.png'
import logo_03 from '@/shared/assets/images/emojis/board-logo-03.png'
import logo_04 from '@/shared/assets/images/emojis/board-logo-04.png'
import logo_05 from '@/shared/assets/images/emojis/board-logo-05.png'
import logo_06 from '@/shared/assets/images/emojis/board-logo-06.png'
import logo_07 from '@/shared/assets/images/emojis/board-logo-07.png'
import logo_08 from '@/shared/assets/images/emojis/board-logo-08.png'
import logo_09 from '@/shared/assets/images/emojis/board-logo-09.png'
import logo_10 from '@/shared/assets/images/emojis/board-logo-10.png'
import logo_11 from '@/shared/assets/images/emojis/board-logo-11.png'
import logo_12 from '@/shared/assets/images/emojis/board-logo-12.png'
import logo_13 from '@/shared/assets/images/emojis/board-logo-13.png'

export const BOARD_LOGOS: BoardLogosType = [
  { emoji: '📚', image: logo_01 },
  { emoji: '⭐️', image: logo_02 },
  { emoji: '👩🏻‍🎨', image: logo_03 },
  { emoji: '✈️', image: logo_04 },
  { emoji: '🥘', image: logo_05 },
  { emoji: '👀', image: logo_06 },
  { emoji: '🧑‍💻', image: logo_07 },
  { emoji: '⛑️', image: logo_08 },
  { emoji: '⏰', image: logo_09 },
  { emoji: '🔑', image: logo_10 },
  { emoji: '🚀', image: logo_11 },
  { emoji: '⚙️', image: logo_12 },
  { emoji: '🛠️', image: logo_13 },
]

export type BoardLogosType = { emoji: string; image: string }[]
export type BoardLogoEmoji = (typeof BOARD_LOGOS)[number]['emoji']

export function getImageByEmoji(emoji: BoardLogoEmoji) {
  const image = BOARD_LOGOS.find((item) => item.emoji === emoji)
  return image?.image || undefined
}
