import { prisma } from '@/sdk/lib/prisma'
import { publicProcedure, router } from '@/sdk/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminInProcedure } from '../../middlewares'
import { getI18n } from '@/sdk/locales/server'
import { check as checkPort } from 'tcp-port-used'
import { PlayerType } from '@/sdk/constants'

const schemaWorldEdit = z.object({
  id: z.number(),
  name: z.string(),
  location: z.number(),
  pvpType: z.number(),
  ip: z.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/),
  port: z.number().min(1).max(65535),
})

export const worldsRouter = router({
  create: adminInProcedure
    .input(schemaWorldEdit.omit({ id: true }))
    .mutation(async ({ input }) => {
      const t = await getI18n()

      const world = await prisma.worlds.findUnique({
        where: {
          name: input.name,
        },
      })

      if (world) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: 'nameAlreadyTaken',
          message: t('quixer.errors.nameAlreadyTaken'),
        })
      }

      await prisma.worlds.create({
        data: {
          name: input.name,
          location: input.location,
          pvp_type: input.pvpType,
          ip: input.ip,
          port: input.port,
        },
      })

      return true
    }),
  delete: adminInProcedure.input(z.number()).mutation(async ({ input }) => {
    const t = await getI18n()

    const world = await prisma.worlds.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        players: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!world) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'worldNotFound',
        message: t('quixer.errors.worldNotFound'),
      })
    }

    if (world.players.length > 0) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        cause: 'worldHasPlayers',
        message: t('quixer.errors.worldHasPlayers'),
      })
    }

    await prisma.worlds.delete({
      where: {
        id: input,
      },
    })

    return true
  }),
  edit: adminInProcedure.input(schemaWorldEdit).mutation(async ({ input }) => {
    const t = await getI18n()

    const world = await prisma.worlds.findUnique({
      where: {
        id: input.id,
      },
    })

    if (!world) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'worldNotFound',
        message: t('quixer.errors.worldNotFound'),
      })
    }

    const updatedWorld = await prisma.worlds.update({
      data: {
        name: input.name,
        location: input.location,
        pvp_type: input.pvpType,
        ip: input.ip,
        port: input.port,
      },
      where: {
        id: input.id,
      },
    })

    return updatedWorld
  }),
  world: publicProcedure.input(z.number()).query(async ({ input }) => {
    const t = await getI18n()

    const world = await prisma.worlds.findUnique({
      where: {
        id: input,
      },
    })

    if (!world) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'worldNotFound',
        message: t('quixer.errors.worldNotFound'),
      })
    }

    return world
  }),
  all: publicProcedure
    .input(
      z.optional(
        z.object({
          pvpType: z.number().optional(),
          location: z.number().optional(),
        })
      )
    )
    .query(async ({ input }) => {
      const worlds = await prisma.worlds.findMany({
        where: {
          pvp_type: input?.pvpType,
          location: input?.location,
        },
        include: {
          world_location: {
            select: {
              name: true,
            },
          },
          world_pvptype: {
            select: {
              name: true,
            },
          },
        },
      })

      return worlds
    }),
  pvpTypes: publicProcedure.query(async () => {
    const pvpTypes = await prisma.world_pvptype.findMany()

    return pvpTypes
  }),
  locations: publicProcedure.query(async () => {
    const locations = await prisma.world_location.findMany()

    return locations
  }),
  online: publicProcedure.query(async () => {
    const worlds = await prisma.worlds.findMany()
    const playersOnline = await prisma.players_online.findMany({
      include: {
        players: {
          select: {
            world_id: true,
          },
        },
      },
      where: {
        players: {
          group_id: {
            lt: PlayerType.GAME_MASTER,
          },
        },
      },
    })

    const online = await Promise.all(
      worlds.map(async (world) => {
        const isOnline = await checkPort(world.port, world.ip)
        const players = playersOnline.filter(
          (player) => player.players.world_id === world.id
        )

        return {
          id: world.id,
          name: world.name,
          isOnline,
          players: players.length,
        }
      })
    )

    return {
      worlds: online,
      totalPlayersOnline: playersOnline.length,
      totalWorldsOnline: online.filter((world) => world.isOnline).length,
    }
  }),
})
