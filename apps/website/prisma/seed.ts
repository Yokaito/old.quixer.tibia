import { PlayerType } from '@/sdk/constants'
import {
  createCharacterRookSample,
  createCharacterSample,
} from '@/sdk/utils/create-character'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const bannedNames = [
  'god',
  'admin',
  'tutor',
  'gamemaster',
  'senior tutor',
  'community manager',
  'godlike',
  'otadmin',
  'otserver',
  'otserv',
]

const mockPlayers = (accountId: number, worldId: number) => {
  return [
    {
      ...createCharacterRookSample({
        name: 'Rook Sample',
        accountId,
        worldId,
        sex: 1,
      }),
    },
    {
      ...createCharacterSample({
        accountId,
        worldId,
        vocation: 1,
        name: 'Sorcerer Sample',
      }),
    },
    {
      ...createCharacterSample({
        accountId,
        worldId,
        vocation: 2,
        name: 'Druid Sample',
      }),
    },
    {
      ...createCharacterSample({
        accountId,
        worldId,
        vocation: 3,
        name: 'Paladin Sample',
      }),
    },
    {
      ...createCharacterSample({
        accountId,
        worldId,
        vocation: 4,
        name: 'Knight Sample',
      }),
    },
    {
      ...createCharacterSample({
        accountId,
        worldId,
        vocation: 0,
        name: '[GM] Quixer',
        groupId: PlayerType.GOD,
      }),
    },
  ]
}

export const main = async (): Promise<void> => {
  const user = await prisma.accounts.create({
    data: {
      name: 'god',
      email: 'god@god.com',
      password: '21298df8a3277357ee55b01df9530b535cf08ec1', // god
      type: 5,
    },
  })

  await prisma.world_pvptype.createMany({
    data: [
      {
        id: 1,
        name: 'Open PvP',
        clientType: 0,
        serverType: 'pvp',
      },
      {
        id: 2,
        name: 'Optional PvP',
        clientType: 1,
        serverType: 'no-pvp',
      },
      {
        id: 3,
        name: 'Hardcore PvP',
        clientType: 2,
        serverType: 'pvp-enforced',
      },
    ],
  })

  await prisma.world_location.createMany({
    data: {
      id: 1,
      name: 'South America',
      clientValue: 'BRA',
    },
  })

  const world = await prisma.worlds.create({
    data: {
      name: 'OTServBR-Global',
      location: 1,
      pvp_type: 2,
      premium_type: 0,
      transfer_type: 0,
      battle_eye: false,
      world_type: 0,
      ip: '127.0.0.1',
      port: 7172,
    },
  })

  await prisma.player_groups.createMany({
    data: [
      {
        id: 1,
        name: 'player',
        group_id: 1,
      },
      {
        id: 2,
        name: 'tutor',
        group_id: 2,
      },
      {
        id: 3,
        name: 'senior tutor',
        group_id: 3,
      },
      {
        id: 4,
        name: 'gamemaster',
        group_id: 4,
      },
      {
        id: 5,
        name: 'community manager',
        group_id: 5,
      },
      {
        id: 6,
        name: 'god',
        group_id: 6,
      },
    ],
  })

  await prisma.players.createMany({
    data: mockPlayers(user.id, world.id),
  })

  await prisma.player_banned_names.createMany({
    data: bannedNames.map((name) => ({
      name,
    })),
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
