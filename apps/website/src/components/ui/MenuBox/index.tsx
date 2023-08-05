import styles from './menu-box.module.scss'
import BorderBox from '@/assets/images/borders/box.webp'

import Image from 'next/image'

type MenuBoxProps = {
  children: React.ReactNode
}

export const MenuBox = ({ children }: MenuBoxProps) => {
  return (
    <div data-qx-menu-box className={`${styles.qxMenuBox}`}>
      <Image
        src={BorderBox}
        alt="BorderBox"
        data-qx-border-box-inverted="false"
        quality={100}
      />
      <div data-qx-content>
        <div data-qx-chain data-qx-chain-right="false" />
        {children}
        <div data-qx-chain data-qx-chain-right="true" />
      </div>
      <Image
        src={BorderBox}
        alt="BorderBox"
        data-qx-border-box-inverted="true"
        quality={100}
      />
    </div>
  )
}

export default MenuBox
