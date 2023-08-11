import { authOptions } from '@/lib/auth'
import { ButtonLogin } from './button.login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const Page = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/account')
  }

  return (
    <>
      <ButtonLogin />
    </>
  )
}

export default Page
