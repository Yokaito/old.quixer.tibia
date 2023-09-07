import { publicProcedure, router } from '../trpc'
import { accountRouter } from './account'
import { playersRouter } from './players'
import { worldsRouter } from './worlds'
import { newsRouter } from './news'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  players: playersRouter,
  account: accountRouter,
  worlds: worldsRouter,
  news: newsRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
