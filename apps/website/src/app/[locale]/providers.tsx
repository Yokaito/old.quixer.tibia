'use client'

import { SessionProvider } from 'next-auth/react'
import { I18nProviderClient } from '@/locales/client'
import TRPCProvider from '@/lib/trpc/Provider'
import { ToastContainer } from 'react-toastify'
import { Session } from 'next-auth'

import en from '@/locales/en'
import fr from '@/locales/fr'
import pt from '@/locales/pt'

type Props = {
  children?: React.ReactNode
  session?: Session | null
  params: { locale: string }
}

export const Providers = ({ children, params: { locale }, session }: Props) => {
  const fallbackLocale = [
    { locale: 'en', messages: en },
    { locale: 'fr', messages: fr },
    { locale: 'pt', messages: pt },
  ]

  const defaultFallback = fallbackLocale.find((l) => l.locale === locale)

  return (
    <I18nProviderClient
      locale={locale}
      fallbackLocale={defaultFallback?.messages}
    >
      <TRPCProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
        <ToastContainer />
      </TRPCProvider>
    </I18nProviderClient>
  )
}
