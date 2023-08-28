import authOptions from '@/sdk/lib/nextauth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Default() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/account')
  }

  return <></>
}
