import { getServerSession } from 'next-auth/next'
import { TRPCError } from '@trpc/server'
import { t } from '@/sdk/server/trpc'
import authOptions from '@/sdk/lib/nextauth'

export const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized',
    })
  }

  return next({
    ctx: {
      ...ctx,
      session: session,
    },
  })
})

export const loggedInProcedure = t.procedure.use(isAuthenticated)
