import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {
  account: React.ReactNode
  login: React.ReactNode
}

export default async function Layout({ account, login }: LayoutProps) {
  const session = await getServerSession(authOptions)

  return <>{session ? account : login}</>
}
