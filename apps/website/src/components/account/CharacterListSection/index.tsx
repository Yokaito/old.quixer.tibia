import { serverClient } from '@/sdk/lib/trpc/server'
import styles from './list.module.scss'
import { otConfig } from '@/quixer'
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
import ModalDeleteCharacter from '../Modals/DeleteCharacter'
import { Container } from '@/components/ui'

export const AccountCharacterListSection = async () => {
  const { characters } = await serverClient.players.myCharacters()
  const t = await getI18n()

  return (
    <Container title={t('quixer.account.titles.characters')}>
      <div className={`${styles.qxCharacterList}`}>
        <div data-qx-character-list-container>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{t('quixer.account.characters.table.name')}</th>
                <th>{t('quixer.account.characters.table.status')}</th>
                <th
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {t('quixer.account.characters.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character, idx) => (
                <tr
                  key={character.id}
                  data-qx-item
                  data-qx-item-main-character={character.main}
                >
                  <td width="15px" data-qx-item-index>
                    {idx + 1}.
                  </td>
                  <td width="50%" data-qx-item-info>
                    <p data-qx-item-info-name>
                      {character.name}
                      {character.main && (
                        <Image src={MainCharacterIcon} alt="main character" />
                      )}
                    </p>
                    <p data-qx-item-info-specifications>
                      {getVocationName(character.vocation)} - Level{' '}
                      {character.level} - {otConfig.server.worldName}
                    </p>
                  </td>
                  <td data-qx-item-status>
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
                  </td>
                  <td data-qx-item-actions width="15%">
                    <div data-qx-item-actions-container>
                      <Link
                        data-qx-item-link
                        href={`/account/character/edit/${character.name}`}
                      >
                        <Icon name="NotePencil" width={18} height={18} />
                      </Link>
                      <ModalDeleteCharacter
                        characterId={character.id}
                        characterName={character.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div data-qx-character-list-footer>
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
