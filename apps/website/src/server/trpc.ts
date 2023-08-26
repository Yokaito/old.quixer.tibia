import { ContextType } from '@/lib/trpc/context'
import { initTRPC } from '@trpc/server'

export const t = initTRPC.context<ContextType>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
