/* eslint-disable turbo/no-undeclared-env-vars */
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import React, { useState } from 'react'

import { trpc } from '@/sdk/lib/trpc/client'

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
          url:
            process.env.NODE_ENV === 'production'
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
              : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`,
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
