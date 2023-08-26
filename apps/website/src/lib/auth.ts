import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import z from 'zod'
import { serverClient } from './trpc/server'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/account',
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

          const user = await serverClient.account.login({
            email: values.email,
            password: values.password,
          })

          return {
            id: user?.id.toString(),
            email: user?.email,
            name: user?.name,
            type: user?.type,
            isPremium: user?.isPremium,
            premiumDateExpireUnixTime: user?.premiumDateExpireUnixTime,
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
          isPremium: token.isPremium,
          premiumDateExpireUnixTime: token.premiumDateExpireUnixTime,
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
          isPremium: u.isPremium,
          premiumDateExpireUnixTime: u.premiumDateExpireUnixTime,
          coins: u.coins,
          coinsTransferable: u.coinsTransferable,
        }
      }
      return token
    },
  },
}

export default authOptions
