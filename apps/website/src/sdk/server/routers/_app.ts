import { publicProcedure, router } from '../trpc'
import { accountRouter } from './account'
import { playersRouter } from './players'
import { worldsRouter } from './worlds'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  players: playersRouter,
  account: accountRouter,
  worlds: worldsRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
