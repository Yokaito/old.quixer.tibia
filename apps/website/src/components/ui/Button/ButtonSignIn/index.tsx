'use client'

import { useSession } from 'next-auth/react'
import { useI18n } from '@/sdk/locales/client'
import ButtonLink from '../ButtonAsLink'

export const ButtonSignIn = () => {
  const session = useSession()
  const t = useI18n()

  const text = session.data
    ? t('quixer.box.login.loggedIn')
    : t('quixer.box.login.login')

  return <ButtonLink text={text} href="/account" />
}

export default ButtonSignIn
