import { httpBatchLink } from '@trpc/client'
import env from '@/sdk/env'

import appRouter from '@/sdk/server/routers/_app'

export const serverClient = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      url:
        env.NODE_ENV === 'production'
          ? `https://${env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
          : `http://${env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`,
    }),
  ],
})
