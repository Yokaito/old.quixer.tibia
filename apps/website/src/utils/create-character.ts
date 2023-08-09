import { players } from '@prisma/client'
import { getVocationName } from './get-vocation'

export const createCharacter = (player: players) => {
  return {
    worldid: 0,
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
    ismaincharacter: player.mainCharacter,
    dailyrewardstate: player.isreward ? 1 : 0,
    remainingdailytournamentplaytime: false,
  }
}

export default createCharacter
