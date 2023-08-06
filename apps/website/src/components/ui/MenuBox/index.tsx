import styles from './menu-box.module.scss'
import { BorderBox } from '@/components/ui/'

import Image from 'next/image'

type MenuBoxProps = {
  children: React.ReactNode
}

export const MenuBox = ({ children }: MenuBoxProps) => {
  return (
    <div data-qx-menu-box className={`${styles.qxMenuBox}`}>
      <BorderBox />
      <div data-qx-content>
        <div data-qx-chain data-qx-chain-right="false" />
        {children}
        <div data-qx-chain data-qx-chain-right="true" />
      </div>
      <BorderBox inverted />
    </div>
  )
}

export default MenuBox
