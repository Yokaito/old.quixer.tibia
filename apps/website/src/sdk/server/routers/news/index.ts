import { prisma } from '@/sdk/lib/prisma'
import { router, publicProcedure } from '@/sdk/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { aboveSeniorTutorProcedure } from '../../middlewares'
import { getI18n } from '@/sdk/locales/server'

export const newsRouter = router({
  editById: aboveSeniorTutorProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        visible: z.boolean(),
        type_news_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const t = await getI18n()
      const newsExists = await prisma.news.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!newsExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'news',
          message: t('quixer.errors.newsNotFound'),
        })
      }

      await prisma.news.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          visible: input.visible,
          type_news_id: input.type_news_id,
        },
      })

      return true
    }),
  getTypes: publicProcedure.query(async () => {
    const types = await prisma.type_news.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return types
  }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    const t = await getI18n()
    const news = await prisma.news.findUnique({
      where: {
        id: input,
      },
      include: {
        type_news: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!news) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        cause: 'news',
        message: t('quixer.errors.newsNotFound'),
      })
    }

    return news
  }),
  deleteById: aboveSeniorTutorProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const t = await getI18n()
      const newsExists = await prisma.news.findUnique({
        where: {
          id: input,
        },
      })

      if (!newsExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'news',
          message: t('quixer.errors.newsNotFound'),
        })
      }

      await prisma.news.delete({
        where: {
          id: input,
        },
      })

      return true
    }),
  getAllWithCreators: publicProcedure.query(async () => {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        type_news: {
          select: {
            name: true,
          },
        },
        accounts: {
          select: {
            email: true,
          },
        },
      },
    })

    return news
  }),
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
