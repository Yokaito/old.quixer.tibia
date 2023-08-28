import { inferAsyncReturnType } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

interface Context extends FetchCreateContextFnOptions {}

export const createContext = async ({ req, resHeaders }: Context) => {
  return {
    req,
    resHeaders,
  }
}

export type ContextType = inferAsyncReturnType<typeof createContext>
