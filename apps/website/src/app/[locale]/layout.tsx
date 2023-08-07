import type { Metadata } from 'next'
import { Fondamento, Martel, Poppins, Roboto } from 'next/font/google'
import '@/styles/global/tokens.scss'
import '@/styles/global/resets.scss'
import '@/styles/global/layout.scss'
import '@/styles/global/typography.scss'

import Layout from '@/components/Layout'
import { NextAuthProvider } from './providers'

const fondamento = Fondamento({
  weight: ['400'],
  subsets: ['latin-ext'],
  variable: '--qx-text-face-fondamento',
})

const martel = Martel({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin-ext'],
  variable: '--qx-text-face-martel',
})

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin-ext'],
  variable: '--qx-text-face-poppins',
})

const roboto = Roboto({
  preload: true,
  weight: ['300', '400', '700'],
  subsets: ['latin-ext'],
  variable: '--qx-text-face-roboto',
})

export const metadata: Metadata = {
  title: 'Home | Quixer',
  description:
    'Tibia is a free massively multiplayer online role-playing game (MMORPG). Join this fascinating game that has thousands of fans from all over the world!',
  keywords:
    'free online game, free multiplayer game, free online rpg, free mmorpg, mmorpg, mmog, online role playing game, online multiplayer game, internet game, online rpg, rpg',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/logo/mitg-icon.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${fondamento.variable} ${martel.variable} ${poppins.variable} ${roboto.variable} ${roboto.className}`}
      >
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  )
}
