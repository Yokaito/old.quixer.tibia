import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
