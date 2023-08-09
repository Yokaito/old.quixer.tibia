import { NextResponse } from 'next/server'
import zod from 'zod'

/**
 * {
website:dev:   FPSHistory: [
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:20:49,821'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 17,
website:dev:       maxFPS: 218,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:21:19,830'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 17,
website:dev:       maxFPS: 243,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:21:49,817'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:22:19,822'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:22:49,818'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:23:19,817'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:23:49,817'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:24:19,817'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:24:49,817'
website:dev:     },
website:dev:     {
website:dev:       averageFPS: 9,
website:dev:       maxFPS: 11,
website:dev:       minFPS: 8,
website:dev:       timeStamp: '2023-08-08 20:25:19,818'
website:dev:     }
website:dev:   ],
website:dev:   clientID: '24a42934f97683f98251a42dbee9e79b11d94320',
website:dev:   dataType: 1,
website:dev:   renderer: 1
website:dev: }
 */

const schema = zod.object({
  FPSHistory: zod.array(
    zod.object({
      averageFPS: zod.number(),
      maxFPS: zod.number(),
      minFPS: zod.number(),
      timestamp: zod.date(),
    })
  ),
  clientID: zod.string(),
  dataType: zod.number(),
  renderer: zod.number(),
})

export async function POST(request: Request) {
  try {
    const body: zod.infer<typeof schema> = await request.json()

    console.log(body)

    return NextResponse.json({}, { status: 400 })
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      return NextResponse.json({ error: error?.issues }, { status: 400 })
    }

    return NextResponse.json({ error: error?.message }, { status: 500 })
  }
}
