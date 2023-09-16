import { publicProcedure, router } from '../trpc'
import { accountRouter } from './account'
import { playersRouter } from './players'
import { worldsRouter } from './worlds'
import { newsRouter } from './news'
import { guildsRouter } from './guilds'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  players: playersRouter,
  account: accountRouter,
  worlds: worldsRouter,
  news: newsRouter,
  guilds: guildsRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
