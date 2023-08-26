import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server/routers/_app'

export const serverClient = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
    }),
  ],
})
