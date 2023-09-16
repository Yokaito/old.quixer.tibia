/* eslint-disable @next/next/no-img-element */
import { Case, Container, Default, Switch } from '@/components/ui'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import InnerContainer from '@/components/ui/Container/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getCurrentLocale, getI18n } from '@/sdk/locales/server'
import { defaultFormat } from '@/sdk/utils/date-format'
import type { guilds, players } from '@prisma/client'
import { ListGuildPlayers } from '../ListGuildPlayers'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { ModalGuildAcceptInvitation } from '../Modals/HandleInvitation'

interface MyCharacters extends players {
  worlds: {
    name: string
  }
}

interface Props extends Omit<guilds, 'balance'> {
  balance: number
  worlds: {
    name: string
  }
}

export const GuildInfoSection = async ({
  motd,
  worlds,
  creationdata,
  logo,
  name,
  id,
}: Props) => {
  const t = await getI18n()
  const locale = getCurrentLocale()
  const players = await serverClient.guilds.getPlayers(id)
  const invited = await serverClient.guilds.getInvitedPlayers(id)
  const session = await getServerSession(authOptions)
  const myCharactersInvited = [] as MyCharacters[]

  if (session) {
    const { characters } = await serverClient.players.myCharacters()

    /**
     * @ALERT
     * Verify if the one of my characters is invited
     * and return to show button to accept or reject
     */
    const invitedCharacters = characters.filter((character) =>
      invited.find((invite) => invite.players.name === character.name)
    )

    for (const character of invitedCharacters) {
      myCharactersInvited.push(character)
    }
  }

  return (
    <>
      <div className="flex items-center w-full px-2 py-3">
        <img src={logo ?? ''} alt={`logo ${name}`} className="w-16" />
        <h1 className="flex-1 text-4xl font-bold text-center text-secondary font-poppins">
          {name}
        </h1>
        <img src={logo ?? ''} alt={`logo ${name}`} className="w-16" />
      </div>
      <div className="flex flex-col items-baseline gap-1 md:flex-row">
        <Container
          className="flex-1"
          title={t('quixer.geral.guildInformation')}
        >
          <InnerContainer>
            <p className="mb-3 text-sm text-secondary">{motd}</p>
            <p className="text-sm text-secondary">
              {t('quixer.geral.guildFounded', {
                worldName: worlds.name,
              })}{' '}
              {defaultFormat(new Date(creationdata * 1000), locale)}
            </p>
            <p className="text-sm text-secondary">
              {t('quixer.geral.guildCurrentActive')}
            </p>
            <p className="text-sm text-secondary">
              {t('quixer.geral.guildOpenForApplications')}
            </p>
          </InnerContainer>
        </Container>
        <Container
          title={t('quixer.geral.navigation')}
          className="w-full md:w-max"
        >
          <InnerContainer className="flex flex-col items-center gap-1">
            <ButtonLink
              text={t('quixer.geral.guildWars')}
              href="/guilds"
              variant="info"
            />
            <ButtonLink
              text={t('quixer.geral.guildEvents')}
              href="/guilds"
              variant="info"
            />
            <ButtonLink
              text={t('quixer.geral.reportOffense')}
              href="/guilds"
              variant="info"
            />
          </InnerContainer>
        </Container>
      </div>
      <Container title={t('quixer.geral.guildMembers')}>
        <ListGuildPlayers players={players} />
      </Container>
      <Container title={t('quixer.geral.guildInvitedPlayers')}>
        <InnerContainer className="p-0 border-0">
          <Switch>
            <Case condition={invited.length === 0}>
              <p className="p-2 text-sm text-secondary">
                {t('quixer.geral.guildNoneInvited')}
              </p>
            </Case>
            <Default>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-base font-bold border text-secondary bg-1000 border-quintenary text-start">
                      {t('quixer.geral.name')}
                    </th>
                    <th className="px-2 text-base font-bold border text-secondary bg-1000 border-quintenary">
                      {t('quixer.geral.level')}
                    </th>
                    {myCharactersInvited.length > 0 && (
                      <th className="px-2 text-base font-bold border text-secondary bg-1000 border-quintenary">
                        {t('quixer.geral.actions')}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {invited.map((invite) => (
                    <tr className="odd:bg-800" key={invite.players.name}>
                      <td className="px-2 py-1 text-sm border-b border-l border-r text-start border-quintenary text-secondary">
                        <Link
                          className="underline text-info"
                          href={`/characters/${invite.players.name}`}
                        >
                          {invite.players.name}
                        </Link>
                      </td>
                      <td className="py-1 px-2 text-sm text-center border-b border-l border-r border-quintenary text-secondary w-[42px] md:w-[84px]">
                        {invite.players.level}
                      </td>
                      <Switch>
                        <Case
                          condition={
                            myCharactersInvited.find(
                              (myCharacter) =>
                                myCharacter.id === invite.player_id
                            ) !== undefined
                          }
                        >
                          <td className="px-2 py-1 text-sm text-center border-b border-l border-r border-quintenary text-secondary w-[42px] md:w-[84px]">
                            <ModalGuildAcceptInvitation
                              guildId={invite.guild_id}
                              playerId={invite.player_id}
                            />
                          </td>
                        </Case>
                      </Switch>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Default>
          </Switch>
        </InnerContainer>
      </Container>
    </>
  )
}
