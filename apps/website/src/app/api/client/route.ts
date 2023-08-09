import { NextResponse } from 'next/server'
import { CacheInfoController } from './cache-info.controller'
import { BoostedCreatureController } from './boosted-creature.controller'
import { LoginController } from './login.controller'
import z, { ZodError } from 'zod'

const schema = z.object({
  type: z.enum(['cacheinfo', 'boostedcreature', 'eventschedule', 'login']),
  email: z.string().optional(),
  password: z.string().optional(),
  token: z.string().optional(),
  stayloggedin: z.boolean().optional(),
  count: z.number().optional(),
  isreturner: z.boolean().optional(),
  offset: z.number().optional(),
  showrewardnews: z.boolean().optional(),
})

export async function POST(request: Request) {
  try {
    const body: z.infer<typeof schema> = await request.json()
    const validatedBody = schema.parse(body)

    switch (body.type) {
      case 'cacheinfo':
        return CacheInfoController()
      case 'boostedcreature':
        return BoostedCreatureController()
      case 'eventschedule':
        return NextResponse.json({ error: 'Not implemented' }, { status: 400 })
      case 'login':
        return LoginController({
          email: validatedBody?.email,
          password: validatedBody?.password,
          token: validatedBody.token,
          stayloggedin: validatedBody.stayloggedin,
        })

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }

    return NextResponse.json({ error: error?.message }, { status: 500 })
  }
}
