import { prisma } from '@/lib/prisma'
import { getI18n } from '@/locales/server'
import { loggedInProcedure } from '@/server/middlewares'
import { publicProcedure, router } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import sha1 from 'sha1'

import { z } from 'zod'

export const accountRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(3).max(50),
      })
    )
    .mutation(async ({ input }) => {
      const t = await getI18n()

      const emailIsTaken = await prisma.accounts.findUnique({
        where: {
          email: input.email,
        },
      })

      if (emailIsTaken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: 'email',
          message: t('quixer.errors.emailAlreadyTaken'),
        })
      }

      const nameIsTaken = await prisma.accounts.findUnique({
        where: {
          name: input.name,
        },
      })

      if (nameIsTaken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: 'name',
          message: t('quixer.errors.nameAlreadyTaken'),
        })
      }

      const encryptedPassword = sha1(input.password)

      const dbUser = await prisma.accounts.create({
        data: {
          email: input.email,
          name: input.name,
          password: encryptedPassword,
        },
      })

      return {
        ...dbUser,
        originalPassword: input.password,
      }
    }),
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
