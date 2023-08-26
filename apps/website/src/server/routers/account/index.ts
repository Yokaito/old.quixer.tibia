import { publicProcedure, router } from '@/server/trpc'
import * as z from 'zod'
import { prisma } from '@/lib/prisma'
import sha1 from 'sha1'
import { TRPCError } from '@trpc/server'
import { verifyPremiumTime } from '@/utils/premium-time'

export const accountRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      const { email, password } = input
      const encryptedPassword = sha1(password)

      const account = await prisma.accounts.findUnique({
        where: { email: email, password: encryptedPassword },
      })

      if (!account) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid login credentials',
        })
      }

      const {
        lastDayLoginUpdated,
        premiumDateExpireUnixTime,
        premiumDaysUpdated,
        saveOnDatabase,
        isPremium,
      } = verifyPremiumTime(account.premdays, account.lastday)

      if (saveOnDatabase) {
        await prisma.accounts.update({
          where: {
            email: account.email,
          },
          data: {
            lastday: lastDayLoginUpdated,
            premdays: premiumDaysUpdated,
          },
        })
      }

      return {
        ...account,
        isPremium,
        premiumDateExpireUnixTime,
      }
    }),
})
