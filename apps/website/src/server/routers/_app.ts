import { publicProcedure, router } from '../trpc'
import { accountRouter } from './account'
import { playersRouter } from './players'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  players: playersRouter,
  account: accountRouter,
})

export type AppRouter = typeof appRouter
