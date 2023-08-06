import { NextResponse } from 'next/server'
import { CacheInfoController } from './cache-info.controller'
import { BoostedCreatureController } from './boosted-creature.controller'
import { LoginController } from './login.controller'

type BodyProps = {
  type: 'cacheinfo' | 'boostedcreature' | 'eventschedule' | 'login' | 'news'
  email?: string
  password?: string
  token?: string
  stayloggedin?: boolean
  count?: number
  isreturner?: boolean
  offset?: number
  showrewardnews?: boolean
}

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const body: BodyProps = await request.json()

    if (!Object.hasOwn(body, 'type')) {
      return NextResponse.json({ error: 'Missing type' }, { status: 400 })
    }

    switch (body.type) {
      case 'cacheinfo':
        return CacheInfoController()
      case 'boostedcreature':
        return BoostedCreatureController()
      case 'eventschedule':
        return NextResponse.json({ error: 'Not implemented' }, { status: 400 })
        break
      case 'login':
        return LoginController()

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }
}
