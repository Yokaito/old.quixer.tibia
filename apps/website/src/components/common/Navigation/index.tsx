import styles from './navigation.module.scss'
import BoxLogin from './BoxLogin'
import Menu from './Menu'
import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'
import { getI18n } from '@/locales/server'

export const Navigation = async () => {
  const t = await getI18n()

  return (
    <nav data-qx-navigation className={`${styles.qxNavigation}`}>
      <BoxLogin />
      <MenuBox showChain>
        <Button variant="regular">{t('quixer.box.download.download')}</Button>
      </MenuBox>
      <Menu />
    </nav>
  )
}

export default Navigation
