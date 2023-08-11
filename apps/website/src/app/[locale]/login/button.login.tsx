'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const ButtonLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/account'

  const onClick = useCallback(async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: 'god@god.com',
        password: 'god',
        callbackUrl,
      })

      if (!res?.error) {
        router.push('/account')
      } else {
        alert(res.error)
      }
    } catch (error) {}
  }, [router, callbackUrl])

  return (
    <>
      <button onClick={onClick}>Logar</button>
    </>
  )
}
