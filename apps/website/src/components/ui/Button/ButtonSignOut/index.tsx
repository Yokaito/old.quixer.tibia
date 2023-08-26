'use client'
import { useSession } from 'next-auth/react'
import styles from './button.signout.module.scss'
import { useI18n } from '@/locales/client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Button from '..'

type Props = {
  variant?: 'link' | 'button'
}

export const ButtonSignOut = ({ variant = 'link' }: Props) => {
  const session = useSession()
  const router = useRouter()
  const t = useI18n()

  const handleClick = useCallback(() => {
    if (session?.data) {
      return signOut({
        callbackUrl: '/',
      })
    }

    router.push('/account/create')
  }, [session, router])

  if (variant === 'button') {
    return (
      <Button variant="red" onClick={handleClick}>
        {session?.data
          ? t('quixer.box.login.logout')
          : t('quixer.box.login.register')}
      </Button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.qxButtonSignOut} fondamentoTitle`}
    >
      {session?.data
        ? t('quixer.box.login.logout')
        : t('quixer.box.login.register')}
    </button>
  )
}
