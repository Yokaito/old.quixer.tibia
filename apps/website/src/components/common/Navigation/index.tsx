import styles from './navigation.module.scss'
import BoxLogin from './BoxLogin'
import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'

export const Navigation = () => {
  return (
    <nav data-qx-navigation className={`${styles.qxNavigation}`}>
      <BoxLogin />
      <MenuBox>
        <Button>Download</Button>
      </MenuBox>
    </nav>
  )
}

export default Navigation
