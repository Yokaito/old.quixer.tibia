import { AccountType } from '@/sdk/constants'
import authOptions from '@/sdk/lib/nextauth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LayoutAdminPages({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || (session?.user && session?.user.type <= AccountType.TUTOR)) {
    redirect(`/account`)
  }

  return <>{children}</>
}
