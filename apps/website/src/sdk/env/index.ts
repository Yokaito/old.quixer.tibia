import * as z from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_PREMIUM_IS_FREE: z
      .string()
      .refine((v) => v === 'true' || v === 'false') as unknown as z.ZodBoolean,
    NEXT_PUBLIC_DELETE_CHARACTER_TIME: z.string().regex(/^\d+$/),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_PREMIUM_IS_FREE: process.env.NEXT_PUBLIC_PREMIUM_IS_FREE,
    NEXT_PUBLIC_DELETE_CHARACTER_TIME:
      process.env.NEXT_PUBLIC_DELETE_CHARACTER_TIME,
  },
})

export default env
