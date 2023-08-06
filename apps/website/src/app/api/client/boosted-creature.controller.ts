import { NextResponse } from 'next/server'

export const BoostedCreatureController = () => {
  return NextResponse.json(
    {
      raceid: 796,
    },
    { status: 200 }
  )
}
