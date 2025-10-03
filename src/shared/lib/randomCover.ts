import { API_URL_IMAGES } from '@/shared/config/API_URL.ts'

type ImageNumber = 1 | 2 | 3 | 4

export const randomCover = (): string => {
  const images: ImageNumber[] = [1, 2, 3, 4]
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomNum = images[randomIndex]

  return `${API_URL_IMAGES}/image-${randomNum}.jpg?raw=true`
}
