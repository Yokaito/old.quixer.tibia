'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import React, { useState } from 'react'

import { trpc } from '@/sdk/lib/trpc/client'
import env from '@/sdk/env'

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 200, retry: false } },
      })
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          url:
            env.NODE_ENV === 'development'
              ? `http://${env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
              : `https://${env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
