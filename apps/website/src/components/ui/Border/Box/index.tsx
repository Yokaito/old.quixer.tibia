import Image from 'next/image'
import BorderBoxImage from '@/assets/images/borders/box.webp'
import { cn } from '@/sdk/utils/tailwind'

type BorderBoxProps = {
  /**
   * If `true`, the border will be inverted.
   * @default false
   */
  inverted?: boolean
}

export const BorderBox = ({ inverted = false }: BorderBoxProps) => {
  const classname = cn({
    'transform rotate-180': inverted,
  })

  return (
    <Image
      className={classname}
      src={BorderBoxImage}
      alt="BorderBox"
      quality={100}
    />
  )
}

export default BorderBox
