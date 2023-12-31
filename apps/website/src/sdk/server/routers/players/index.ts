import { router, publicProcedure } from '@/sdk/server/trpc'
import { prisma } from '@/sdk/lib/prisma'
import { loggedInProcedure } from '@/sdk/server/middlewares'
import { z } from 'zod'
import { getI18n } from '@/sdk/locales/server'
import { TRPCError } from '@trpc/server'
import { createCharacterRookSample } from '@/sdk/utils/create-character'
import env from '@/sdk/env'

export const playersRouter = router({
  cancelDeletion: loggedInProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const t = await getI18n()
      const { session } = ctx

      const player = await prisma.players.findUnique({
        where: {
          id: input,
          account_id: Number(session.user.id),
        },
      })

      if (!player) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotFound'),
        })
      }

      await prisma.players.update({
        where: {
          id: player.id,
        },
        data: {
          deletion: 0,
        },
      })

      return true
    }),
  delete: loggedInProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const t = await getI18n()
      const { session } = ctx

      const player = await prisma.players.findUnique({
        where: {
          id: input,
          account_id: Number(session.user.id),
        },
      })

      if (!player) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotFound'),
        })
      }

      const deletionDate = new Date()
      deletionDate.setDate(
        deletionDate.getDate() + parseInt(env.NEXT_PUBLIC_DELETE_CHARACTER_TIME)
      )
      const deletionTimeStamp = Math.floor(deletionDate.getTime() / 1000)

      await prisma.players.update({
        where: {
          id: player.id,
        },
        data: {
          deletion: deletionTimeStamp,
        },
      })

      return true
    }),
  editMyCharacter: loggedInProcedure
    .input(
      z.object({
        id: z.number(),
        comment: z.string().max(255).optional(),
        ishidden: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const t = await getI18n()
      const { session } = ctx

      const player = await prisma.players.findUnique({
        where: {
          id: input.id,
          account_id: Number(session.user.id),
        },
      })

      if (!player) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotFound'),
        })
      }

      await prisma.players.update({
        data: {
          ishidden: input.ishidden,
          comment: input.comment,
        },
        where: {
          id: input.id,
        },
      })

      return true
    }),
  getMyByName: loggedInProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { session } = ctx

      const player = await prisma.players.findUnique({
        where: {
          name: input,
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

      return player
    }),
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
