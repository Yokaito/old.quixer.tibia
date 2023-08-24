import { publicProcedure, router } from '../trpc'
import { playersRouter } from './players'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  players: playersRouter,
})

export type AppRouter = typeof appRouter
