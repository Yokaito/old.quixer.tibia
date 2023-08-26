import { prisma } from '@/lib/prisma'
import { loggedInProcedure } from '@/server/middlewares'
import { router } from '@/server/trpc'
import { TRPCError } from '@trpc/server'

export const accountRouter = router({
  myInfo: loggedInProcedure.query(async ({ ctx }) => {
    const dbUser = await prisma.accounts.findUnique({
      where: {
        id: Number(ctx.session?.user.id),
      },
      select: {
        type: true,
        tournament_coins: true,
        recruiter: true,
        premdays_purchased: true,
        premdays: true,
        lastday: true,
        name: true,
        id: true,
        email: true,
        creation: true,
        coins: true,
        password: false,
        coins_transferable: true,
      },
    })

    if (!dbUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    return {
      ...dbUser,
    }
  }),
})
