import { serverClient } from '@/sdk/lib/trpc/server'
import { getVocationName } from '@/sdk/utils/get-vocation'
import DailyRewardNotCollectedIcon from '@/assets/images/icons/global/dailyreward-notcollected.png'
import DailyRewardCollectedIcon from '@/assets/images/icons/global/dailyreward-collected.png'
import MainCharacterIcon from '@/assets/images/icons/global/maincharacter.png'
import StatusHiddenIcon from '@/assets/images/icons/global/status-hidden.png'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Link from 'next/link'
import { getI18n } from '@/sdk/locales/server'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import { ModalCancelDeleteCharacter } from '../Modals/CancelDeleteCharacter'
import { ModalDeleteCharacter } from '../Modals/DeleteCharacter'
import { Container } from '@/components/ui'
import { DeletionStatus } from '@/components/ui/DeletionStatus'

export const AccountCharacterListSection = async () => {
  const { characters } = await serverClient.players.myCharacters()
  const t = await getI18n()

  return (
    <Container title={t('quixer.account.titles.characters')}>
      <div className={`flex flex-col gap-4`}>
        <div className="flex bg-600 shadow-container outline outline-1 outline-secondary">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-1 border text-start border-quintenary"></th>
                <th className="p-1 border text-start border-quintenary">
                  {t('quixer.account.characters.table.name')}
                </th>
                <th className="p-1 border text-start border-quintenary">
                  {t('quixer.account.characters.table.status')}
                </th>
                <th className="p-1 text-center border border-quintenary">
                  {t('quixer.account.characters.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character, idx) => (
                <tr key={character.id} className="odd:bg-900">
                  <td
                    className="p-1 border text-start border-quintenary"
                    width="15px"
                  >
                    {idx + 1}.
                  </td>
                  <td
                    className="p-1 border text-start border-quintenary"
                    width="50%"
                  >
                    <p className="flex items-center gap-2 text-sm font-medium text-secondary">
                      {character.name}
                      {character.main && (
                        <Image src={MainCharacterIcon} alt="main character" />
                      )}
                    </p>
                    <p className="mt-[2px] text-[12px] text-secondary">
                      {getVocationName(character.vocation)} - Level{' '}
                      {character.level} - {character.worlds.name}
                    </p>
                  </td>
                  <td className="p-1 border text-start border-quintenary">
                    <div className="flex gap-2">
                      {character.isreward ? (
                        <Image
                          src={DailyRewardNotCollectedIcon}
                          alt="reward not collected"
                        />
                      ) : (
                        <Image
                          src={DailyRewardCollectedIcon}
                          alt="reward collected"
                        />
                      )}
                      {character.ishidden && (
                        <Image src={StatusHiddenIcon} alt="status hidden" />
                      )}
                      <DeletionStatus
                        timeToDeletion={Number(character.deletion)}
                      />
                    </div>
                  </td>
                  <td
                    className="p-1 border text-start border-quintenary"
                    width="15%"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        className="p-1 text-secondary visited:text-secondary"
                        href={`/account/character/edit/${character.name}`}
                      >
                        <Icon name="NotePencil" width={18} height={18} />
                      </Link>
                      {Number(character.deletion) == 0 ? (
                        <ModalDeleteCharacter
                          characterId={character.id}
                          characterName={character.name}
                        />
                      ) : (
                        <ModalCancelDeleteCharacter
                          characterId={character.id}
                          characterName={character.name}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <ButtonLink
            variant="info"
            href="/account/character/create"
            text={t('quixer.account.characters.create')}
          />
        </div>
      </div>
    </Container>
  )
}

export default AccountCharacterListSection
