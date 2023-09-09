import { httpBatchLink } from '@trpc/client'

import appRouter from '@/sdk/server/routers/_app'

export const serverClient = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      url: `/api/trpc`,
    }),
  ],
})
