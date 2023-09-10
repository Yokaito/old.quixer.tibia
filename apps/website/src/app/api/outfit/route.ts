import { NextResponse } from 'next/server'
import { z } from 'zod'
import { outfitImagesPath, walkSpeeds } from '@/sdk/outfiter/config'
import { loadData, outfit } from '@/sdk/outfiter/outfits'

const schema = z.object({
  looktype: z.string().regex(/^[0-9]+$/),
  mount: z.string().regex(/^[0-9]+$/),
  lookhead: z.string().regex(/^[0-9]+$/),
  lookbody: z.string().regex(/^[0-9]+$/),
  looklegs: z.string().regex(/^[0-9]+$/),
  lookfeet: z.string().regex(/^[0-9]+$/),
  lookaddons: z.string().regex(/^[0-9]+$/),
  direction: z
    .string()
    .regex(/^[0-9]+$/)
    .default('3'),
  resize: z.string().regex(/^[0-9]+$/),
})

export const revalidate = false
export const fetchCache = 'force-cache'

export async function GET(request: Request) {
  try {
    //generateCacheIfNeeded()
    const { searchParams } = new URL(request.url)

    const allParams = Object.fromEntries(searchParams)

    const params = schema.parse(allParams)
    const looktype = parseInt(params.looktype)

    let outfitData = loadData(looktype, outfitImagesPath, false)
    if (!outfitData) {
      return NextResponse.json({})
    }

    let mount = parseInt(params.mount)

    if (mount > 0) {
      const mountOutfitData = loadData(
        mount,
        outfitImagesPath,
        true,
        outfitData
      )
      if (mountOutfitData) {
        outfitData = mountOutfitData
      } else {
        mount = 0
      }
    }

    if (!outfitData) {
      throw new Error('Outfit data not found')
    }

    const head = parseInt(params.lookhead)
    const body = parseInt(params.lookbody)
    const legs = parseInt(params.looklegs)
    const feet = parseInt(params.lookfeet)
    const addons = parseInt(params.lookaddons)
    const direction = parseInt(params.direction)
    const resize = parseInt(params.resize)

    const frames: CanvasRenderingContext2D[] = []
    const durations: number[] = []

    const moveAnimFrames: number = outfitData?.framesNumber

    for (
      let moveAnimFrame = 1;
      moveAnimFrame <= moveAnimFrames;
      moveAnimFrame++
    ) {
      const frame = await outfit(
        outfitData,
        outfitImagesPath,
        looktype,
        addons,
        head,
        body,
        legs,
        feet,
        mount,
        direction,
        moveAnimFrame,
        resize === 1
      )

      if (!frame) {
        throw Error('Failed to create canvas frame')
      }
      frames.push(frame as unknown as CanvasRenderingContext2D)
      durations.push(walkSpeeds[moveAnimFrames])
    }

    return NextResponse.json({
      frames: frames.map((frame, idx) => ({
        image: frame.canvas.toDataURL(),
        duration: durations[idx],
      })),
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        errors: error.errors,
      })
    }

    return NextResponse.json({
      error: error.message,
    })
  }
}
