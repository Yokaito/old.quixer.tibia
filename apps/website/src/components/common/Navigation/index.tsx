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
    <nav
      className="relative flex-col items-center hidden gap-4 xl:flex"
      style={{
        gridArea: 'navigation',
      }}
    >
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
