import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const players = await prisma.players_online.findMany({
    include: {
      players: {
        select: {
          group_id: true,
        },
      },
    },
    where: {
      players: {
        group_id: {
          lte: 6,
        },
      },
    },
  })

  return NextResponse.json(
    {
      online: players.length,
    },
    {
      status: 200,
    }
  )
}
