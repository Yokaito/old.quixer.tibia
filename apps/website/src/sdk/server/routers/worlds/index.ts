import { prisma } from '@/sdk/lib/prisma'
import { publicProcedure, router } from '@/sdk/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { adminInProcedure } from '../../middlewares'
import { getI18n } from '@/sdk/locales/server'

const schemaWorldEdit = z.object({
  id: z.number(),
  name: z.string(),
  location: z.number(),
  pvpType: z.number(),
  ip: z.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/),
  port: z.number().min(1).max(65535),
})

export const worldsRouter = router({
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
})
