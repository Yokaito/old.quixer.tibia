import { getServerSession } from 'next-auth/next'
import { TRPCError } from '@trpc/server'
import { t } from '@/sdk/server/trpc'
import authOptions from '@/sdk/lib/nextauth'
import { getI18n } from '@/sdk/locales/server'

export const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  const session = await getServerSession(authOptions)
  const t = await getI18n()

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: t('quixer.errors.unauthorized'),
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
