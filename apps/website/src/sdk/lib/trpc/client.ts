import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@/sdk/server/routers/_app'

export const trpc = createTRPCReact<AppRouter>({})
