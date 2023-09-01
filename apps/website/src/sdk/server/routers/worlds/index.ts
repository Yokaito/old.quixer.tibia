import { prisma } from '@/sdk/lib/prisma'
import { publicProcedure, router } from '@/sdk/server/trpc'
import { z } from 'zod'

export const worldsRouter = router({
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
