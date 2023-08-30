import { router, publicProcedure } from '@/sdk/server/trpc'
import { prisma } from '@/sdk/lib/prisma'
import { loggedInProcedure } from '@/sdk/server/middlewares'
import { z } from 'zod'
import { getI18n } from '@/sdk/locales/server'
import { TRPCError } from '@trpc/server'

export const playersRouter = router({
  online: publicProcedure.query(async () => {
    const playersOnline = await prisma.players_online.findMany({
      include: {
        players: {
          select: {
            group_id: true,
          },
        },
      },
      where: {
        players: {
          group_id: {
            lte: 6,
          },
        },
      },
    })

    return {
      online: playersOnline.length,
    }
  }),
  myCharacters: loggedInProcedure.query(async ({ ctx }) => {
    const { session } = ctx

    const characters = await prisma.players.findMany({
      where: {
        account_id: Number(session.user.id),
      },
      include: {
        worlds: {
          select: {
            name: true,
          },
        },
      },
    })

    return {
      characters,
    }
  }),
  create: loggedInProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3)
          .max(15)
          .regex(/^[a-zA-Z0-9 ]+$/),
        sex: z.number().min(0).max(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const t = await getI18n()
      const { user } = ctx.session

      const nameIsTaken = await prisma.players.findUnique({
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

      const character = await prisma.players.create({
        data: {
          name: input.name,
          group_id: 1,
          account_id: Number(user.id),
          level: 2,
          vocation: 0,
          health: 155,
          healthmax: 155,
          experience: BigInt(100),
          lookbody: 113,
          lookfeet: 115,
          lookhead: 95,
          looklegs: 39,
          looktype: 129,
          maglevel: 2,
          mana: 60,
          manamax: 60,
          manaspent: BigInt(5936),
          town_id: 1,
          conditions: Buffer.from(''),
          cap: 410,
          sex: input.sex,
          skill_club: 12,
          skill_club_tries: BigInt(155),
          skill_sword: 12,
          skill_sword_tries: BigInt(155),
          skill_axe: 12,
          skill_axe_tries: BigInt(155),
          skill_dist: 12,
          skill_dist_tries: BigInt(93),
        },
      })

      return {
        character,
      }
    }),
})
