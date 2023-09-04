'use client'
import { useSession, signOut } from 'next-auth/react'
import { useI18n } from '@/sdk/locales/client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
      <Button className="fondamento-title" variant="red" onClick={handleClick}>
        {session?.data
          ? t('quixer.box.login.logout')
          : t('quixer.box.login.register')}
      </Button>
    )
  }

  return (
    <Button onClick={handleClick} className="text-sm fondamento-title">
      {session?.data
        ? t('quixer.box.login.logout')
        : t('quixer.box.login.register')}
    </Button>
  )
}
