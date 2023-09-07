import { prisma } from '@/sdk/lib/prisma'
import { router, publicProcedure } from '@/sdk/server/trpc'
import { z } from 'zod'

export const newsRouter = router({
  all: publicProcedure
    .input(
      z.object({
        take: z.number().default(5),
      })
    )
    .query(async ({ input }) => {
      const news = await prisma.news.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: input.take,
        include: {
          type_news: {
            select: {
              name: true,
            },
          },
        },
      })

      return news
    }),
})
