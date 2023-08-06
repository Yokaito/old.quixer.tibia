import { NextResponse } from 'next/server'

/**
 * Error codes:
 * 1: Sorry.
 * 2: Sorry
 * 3: Sorry
 * 4: Sorry
 * 5: Sorry
 * 6: Open new window to put token, Two-factor authentication is enabled on your account. Please enter your authentication token. (mobile)
 * 7: Sorry
 * 8: Open new window to put token, Your account has been locked. Please enter your authentication token. (email)
 */

export const unauthorizedClientTibia = (
  message: string,
  errorCode = 3,
  body?: any
) => {
  return {
    errorCode: errorCode,
    errorMessage: message,
    body,
  }
}

export const LoginController = () => {
  const objectToReturn = {
    playdata: {
      characters: [
        {
          worldid: 0,
          dailyrewardstate: 0,
          ishidden: false,
          ismaincharacter: true,
          ismale: true,
          level: 8,
          name: '[GM] Kamity',
          tutorial: false,
          vocation: 'None',
          outfitid: 75,
          addonsflags: 0,
          detailcolor: 115,
          headcolor: 95,
          legscolor: 39,
          torsocolor: 113,
          istournamentparticipant: false,
          remainingdailytournamentplaytime: 0,
        },
      ],
      worlds: [
        {
          id: 0,
          name: 'OTServBR-Global',
          externaladdress: '127.0.0.1',
          externaladdressprotected: '127.0.0.1',
          externaladdressunprotected: '127.0.0.1',
          externalport: 7172,
          externalportprotected: 7172,
          externalportunprotected: 7172,
          location: 'BRA',
          anticheatprotection: false,
          istournamentworld: false,
          currenttournamentphase: 0,
          previewstate: 0,
          pvptype: 0,
          restrictedstore: false,
        },
      ],
    },
    session: {
      emailcoderequest: false,
      fpstracking: true,
      ispremium: true,
      isreturner: false,
      lastlogintime: 1691358314,
      optiontracking: true,
      premiumuntil: 0,
      returnernotification: false,
      sessionkey: `@god\ngod`,
      showrewardnews: false,
      status: 'active',
      tournamentticketpurchasestate: 0,
      TournamentCyclePhase: 0,
    },
  }

  return NextResponse.json(objectToReturn, {
    status: 200,
  })
}
