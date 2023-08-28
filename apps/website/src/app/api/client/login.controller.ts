import { NextResponse } from 'next/server'
import z from 'zod'
import sha1 from 'sha1'
import { prisma } from '@/sdk/lib/prisma'
import { verifyPremiumTime } from '@/sdk/utils/premium-time'
import createCharacter from '@/sdk/utils/create-character'
import { otConfig } from '@/quixer'

/**
 * Error codes:
 * 1: Sorry.
 * 2: Sorry
 * 3: Sorry
 * 4: Sorry
 * 5: Sorry
 * 6: Open new window to put token, Two-factor authentication is enabled on your account. Please enter your authentication token. (mobile)
 * 7: Sorry
 * 8: Open new window to put token, Your account has been locked. Please enter your authentication token. (email)
 */

export const unauthorizedClientTibia = (
  message: string,
  errorCode = 3,
  body?: any
) => {
  return {
    errorCode: errorCode,
    errorMessage: message,
    body,
  }
}

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  token: z.string().optional(),
  stayloggedin: z.boolean().optional(),
})

export const LoginController = async (
  data: Partial<z.infer<typeof schema>>
) => {
  try {
    const validatedBody = schema.parse(data)

    const encryptedPassword = sha1(validatedBody.password)

    const account = await prisma.accounts.findUnique({
      where: {
        email: validatedBody.email,
        password: encryptedPassword,
      },
    })

    if (!account) {
      return NextResponse.json(
        unauthorizedClientTibia('Invalid email or password', 3),
        { status: 200 }
      )
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

    const accountCharacters = await prisma.players.findMany({
      where: {
        account_id: account.id,
      },
      orderBy: {
        name: 'asc',
      },
    })

    const characters = accountCharacters.map((character) =>
      createCharacter(character)
    )

    const objectToClientTibia = {
      playdata: {
        characters,
        worlds: [
          {
            id: otConfig.server.worldid,
            name: otConfig.server.worldName,
            externaladdress: otConfig.server.ip,
            externaladdressprotected: otConfig.server.ip,
            externaladdressunprotected: otConfig.server.ip,
            externalport: otConfig.server.loginProtocolPort,
            externalportprotected: otConfig.server.gameProtocolPort,
            externalportunprotected: otConfig.server.gameProtocolPort,
            location: otConfig.server.location,
            anticheatprotection: otConfig.server.battleEyeActive,
            istournamentworld: false,
            currenttournamentphase: 0,
            previewstate: 0,
            pvptype: otConfig.server.pvpType,
            restrictedstore: false,
          },
        ],
      },
      session: {
        emailcoderequest: false,
        fpstracking: true,
        ispremium: otConfig.server.premiumIsFree ? true : isPremium,
        isreturner: false,
        lastlogintime: account.lastday,
        optiontracking: true,
        premiumuntil: premiumDaysUpdated > 0 ? premiumDateExpireUnixTime : 0,
        returnernotification: false,
        sessionkey: `${account.email}\n${validatedBody.password}`,
        showrewardnews: false,
        status: 'active',
        tournamentticketpurchasestate: 0,
        TournamentCyclePhase: 0,
      },
    }

    return NextResponse.json(objectToClientTibia, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      unauthorizedClientTibia('Invalid email or password', 3),
      { status: 200 }
    )
  }
}
