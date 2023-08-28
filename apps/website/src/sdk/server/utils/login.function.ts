import { prisma } from '@/sdk/lib/prisma'
import { verifyPremiumTime } from '@/sdk/utils/premium-time'
import { TRPCError } from '@trpc/server'
import sha1 from 'sha1'

export const loginFunction = async (email: string, password: string) => {
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
}
