import styles from './menu-box.module.scss'
import { BorderBox } from '@/components/ui/'

type MenuBoxProps = {
  /**
   * Show chain
   * @default false
   */
  showChain?: boolean
  /**
   * Show background image
   * @default true
   */
  showBackground?: boolean
  /**
   * Children
   * @default null
   */
  children: React.ReactNode
}

export const MenuBox = ({
  children,
  showChain = false,
  showBackground = true,
}: MenuBoxProps) => {
  return (
    <div data-qx-menu-box className={`${styles.qxMenuBox}`}>
      <BorderBox />
      <div data-qx-content data-qx-context-background={showBackground}>
        {showChain && <div data-qx-chain data-qx-chain-right="false" />}

        {children}
        {showChain && <div data-qx-chain data-qx-chain-right="true" />}
      </div>
      <BorderBox inverted />
    </div>
  )
}

export default MenuBox
