import { router, publicProcedure } from '@/sdk/server/trpc'
import { prisma } from '@/sdk/lib/prisma'
import { loggedInProcedure } from '@/sdk/server/middlewares'
import { z } from 'zod'
import { getI18n } from '@/sdk/locales/server'
import { TRPCError } from '@trpc/server'
import { createCharacterRookSample } from '@/sdk/utils/create-character'

export const playersRouter = router({
  byWorldCount: publicProcedure.input(z.number()).query(async ({ input }) => {
    const players = await prisma.players.count({
      where: {
        world_id: input,
      },
    })

    return {
      players,
    }
  }),
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
        worldId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const t = await getI18n()
      const { user } = ctx.session

      const namesBanned = await prisma.player_banned_names.findMany()

      const nameIsBanned = namesBanned.some((name) => {
        return input.name.toLowerCase().includes(name.name.toLowerCase())
      })

      if (nameIsBanned) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: 'name',
          message: t('quixer.errors.nameIsNotPermitted'),
        })
      }

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

      const world = await prisma.worlds.findUnique({
        where: {
          id: input.worldId,
        },
      })

      if (!world) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: 'worldId',
          message: t('quixer.errors.worldNotFound'),
        })
      }

      await prisma.players.create({
        data: createCharacterRookSample({
          accountId: Number(user.id),
          name: input.name,
          sex: input.sex,
          worldId: input.worldId,
        }),
      })

      return {
        status: 'success',
      }
    }),
})
