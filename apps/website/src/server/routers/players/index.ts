import { publicProcedure, router } from '@/server/trpc'
import { prisma } from '@/lib/prisma'

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
})
