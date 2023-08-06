import Image from 'next/image'
import styles from './box.module.scss'
import BorderBoxImage from '@/assets/images/borders/box.webp'

type BorderBoxProps = {
  /**
   * If `true`, the border will be inverted.
   * @default false
   */
  inverted?: boolean
}

export const BorderBox = ({ inverted = false }: BorderBoxProps) => {
  return (
    <Image
      className={`${styles.qxBorderBox}`}
      src={BorderBoxImage}
      alt="BorderBox"
      data-qx-border-box-inverted={inverted}
      quality={100}
    />
  )
}

export default BorderBox
