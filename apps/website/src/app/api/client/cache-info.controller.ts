import { NextResponse } from 'next/server'

export const CacheInfoController = () => {
  return NextResponse.json(
    {
      playersonline: 2992,
      twitchstreams: 15,
      twitchviewer: 10,
      gamingyoutubestreams: 23,
      gamingyoutubeviewer: 21,
    },
    { status: 200 }
  )
}
