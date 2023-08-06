import styles from './navigation.module.scss'
import BoxLogin from './BoxLogin'
import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'
import { getI18n } from '@/locales/server'

export const Navigation = async () => {
  const t = await getI18n()

  return (
    <nav data-qx-navigation className={`${styles.qxNavigation}`}>
      <BoxLogin />
      <MenuBox>
        <Button>{t('quixer.menu-box.download')}</Button>
      </MenuBox>
    </nav>
  )
}

export default Navigation
