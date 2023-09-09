import { getServerSession } from 'next-auth/next'
import { TRPCError } from '@trpc/server'
import { t } from '@/sdk/server/trpc'
import authOptions from '@/sdk/lib/nextauth'
import { AccountType } from '@/constants'
import { getI18n } from '@/sdk/locales/server'

export const isAboveSeniorTutor = t.middleware(async ({ next, ctx }) => {
  const session = await getServerSession(authOptions)
  const t = await getI18n()

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: t('quixer.errors.unauthorized'),
    })
  }

  if (session.user.type < AccountType.SENIOR_TUTOR) {
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

export const aboveSeniorTutorProcedure = t.procedure.use(isAboveSeniorTutor)
