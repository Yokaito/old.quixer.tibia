import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import z from 'zod'
import { prisma } from './prisma'
import sha1 from 'sha1'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    // add 1 week maxAge
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: unknown) {
        try {
          const values = schema.parse(credentials)

          const encryptedPassword = sha1(values.password)

          const user = await prisma.accounts.findUnique({
            where: { email: values.email, password: encryptedPassword },
          })

          if (!user) throw new Error()

          return {
            id: user?.id.toString(),
            email: user?.email,
            name: user?.name,
            type: user?.type,
            premiumDays: user?.premdays,
            coins: user?.coins,
            coinsTransferable: user?.coins_transferable,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          type: token.type,
          premiumDays: token.premiumDays,
          coins: token.coins,
          coinsTransferable: token.coinsTransferable,
        },
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          type: u.type,
          premiumDays: u.premiumDays,
          coins: u.coins,
          coinsTransferable: u.coinsTransferable,
        }
      }
      return token
    },
  },
}

export default authOptions
