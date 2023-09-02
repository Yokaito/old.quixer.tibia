import styles from './navigation.module.scss'
import BoxLogin from './BoxLogin'
import Menu from './Menu'
import { Case, MenuBox, Switch } from '@/components/ui'
import Button from '@/components/ui/Button'
import { getI18n } from '@/sdk/locales/server'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { PlayerType } from '@/sdk/constants'

export const Navigation = async () => {
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  return (
    <nav data-qx-navigation className={`${styles.qxNavigation}`}>
      <BoxLogin />
      <Switch>
        <Case condition={session!?.user.type >= PlayerType.TUTOR}>
          <MenuBox showChain>
            <ButtonLink
              variant="regular"
              text={t('quixer.geral.admin')}
              href="/admin"
            />
          </MenuBox>
        </Case>
      </Switch>
      <MenuBox showChain>
        <Button variant="regular">{t('quixer.box.download.download')}</Button>
      </MenuBox>
      <Menu />
    </nav>
  )
}

export default Navigation
