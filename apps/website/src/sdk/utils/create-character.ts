import { players } from '@prisma/client'
import { getVocationName } from './get-vocation'

export const createCharacterForClient = (player: players) => {
  return {
    worldid: player.world_id,
    name: player.name,
    ismale: player.sex === 1,
    tutorial: player.istutorial,
    level: player.level,
    vocation: getVocationName(player.vocation),
    outfitid: player.looktype,
    headcolor: player.lookhead,
    torsocolor: player.lookbody,
    legscolor: player.looklegs,
    detailcolor: player.lookfeet,
    addonsflags: player.lookaddons,
    ishidden: player.ishidden,
    istournamentparticipant: false,
    ismaincharacter: player.main,
    dailyrewardstate: player.isreward ? 1 : 0,
    remainingdailytournamentplaytime: false,
  }
}

export const createCharacterSample = ({
  accountId,
  name,
  vocation,
  worldId,
  groupId,
}: {
  name: string
  worldId: number
  accountId: number
  vocation: number
  groupId?: number
}) => {
  return {
    name: name,
    group_id: groupId ? groupId : 1,
    ishidden: true,
    world_id: worldId,
    account_id: accountId,
    level: 8,
    vocation: vocation,
    health: 185,
    healthmax: 185,
    experience: BigInt(4200),
    lookbody: 113,
    lookfeet: 115,
    lookhead: 95,
    looklegs: 39,
    looktype: 129,
    maglevel: 0,
    mana: 90,
    manamax: 90,
    manaspent: BigInt(0),
    town_id: 8,
    conditions: Buffer.from(''),
    cap: 470,
    sex: 1,
    skill_club: 10,
    skill_club_tries: BigInt(0),
    skill_sword: 10,
    skill_sword_tries: BigInt(0),
    skill_axe: 10,
    skill_axe_tries: BigInt(0),
    skill_dist: 10,
    skill_dist_tries: BigInt(0),
  }
}

export const createCharacterRookSample = ({
  accountId,
  name,
  sex,
  worldId,
}: {
  name: string
  worldId: number
  sex: number
  accountId: number
}) => {
  return {
    name: name,
    group_id: 1,
    account_id: accountId,
    level: 2,
    vocation: 0,
    world_id: worldId,
    health: 155,
    healthmax: 155,
    experience: BigInt(100),
    lookbody: 113,
    lookfeet: 115,
    lookhead: 95,
    looklegs: 39,
    looktype: 129,
    maglevel: 2,
    mana: 60,
    manamax: 60,
    manaspent: BigInt(5936),
    town_id: 1,
    conditions: Buffer.from(''),
    cap: 410,
    sex: sex,
    skill_club: 12,
    skill_club_tries: BigInt(155),
    skill_sword: 12,
    skill_sword_tries: BigInt(155),
    skill_axe: 12,
    skill_axe_tries: BigInt(155),
    skill_dist: 12,
    skill_dist_tries: BigInt(93),
  }
}
