import NextAuth from 'next-auth'
import { authOptions } from '@/sdk/lib/nextauth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
