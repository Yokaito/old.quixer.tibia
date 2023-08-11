'use client'

import { useSession } from 'next-auth/react'
import { useI18n } from '@/locales/client'
import ButtonLink from '../ButtonAsLink'

export const ButtonSignIn = () => {
  const session = useSession()
  const t = useI18n()

  const text = session.data
    ? t('quixer.box.login.loggedIn')
    : t('quixer.box.login.login')
  const href = session.data ? '/account' : '/login'

  return <ButtonLink text={text} href={href} />
}

export default ButtonSignIn
