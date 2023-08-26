import { Case, Container, Default, Switch } from '@/components/ui'
import styles from './styles.module.scss'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import CoinsTransferableIcon from '@/assets/images/icons/global/icon-tibiacoin.png'
import CoinsNonTransferableIcon from '@/assets/images/icons/global/icon-tibiacointrusted.png'
import Image from 'next/image'
import { convertUnixTimeToDate } from '@/utils/date-format'
import { serverClient } from '@/lib/trpc/server'
import { getCurrentLocale, getI18n } from '@/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import { otConfig } from '@/quixer'

export const GeneralInformationSection = async () => {
  const user = await serverClient.account.myInfo()
  const session = await getServerSession(authOptions)
  const locale = getCurrentLocale()
  const t = await getI18n()

  return (
    <Container
      className={styles.qxGeneralInformationSection}
      title={t('quixer.account.titles.general')}
    >
      <div data-qx-general-information-wrapper>
        <div data-qx-general-information-container>
          <table>
            <tbody>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.email')}
                </td>
                <td data-qx-general-information-value>{user.email}</td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.created')}
                </td>
                <td data-qx-general-information-value>
                  {convertUnixTimeToDate(user.creation, locale)}
                </td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.lastLogin')}
                </td>
                <td data-qx-general-information-value>not implemented</td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.accountStatus')}
                </td>
                <td data-qx-general-information-value>
                  <div data-qx-general-information-premium>
                    <span
                      data-qx-general-information-premium-status={
                        otConfig.server.premiumIsFree ||
                        session?.user?.isPremium
                      }
                    >
                      <Switch>
                        <Case condition={otConfig.server.premiumIsFree}>
                          <>{t('quixer.account.status.freePremium')}</>
                        </Case>
                        <Case condition={session?.user?.isPremium as boolean}>
                          <>{t('quixer.account.status.premium')}</>
                        </Case>
                        <Default>
                          <>{t('quixer.account.status.free')}</>
                        </Default>
                      </Switch>
                    </span>
                    <span data-qx-general-information-premium-time>
                      <Switch>
                        <Case condition={otConfig?.server?.premiumIsFree}>
                          <>
                            ({t('quixer.account.status.freePermanent')},{' '}
                            {t('quixer.account.status.balance', {
                              days: 0,
                            })}
                            )
                          </>
                        </Case>
                        <Case condition={session?.user?.isPremium as boolean}>
                          <>
                            ({t('quixer.account.status.timeLeft')}{' '}
                            {convertUnixTimeToDate(
                              session?.user.premiumDateExpireUnixTime || 0,
                              locale
                            )}
                            ,{' '}
                            {t('quixer.account.status.balance', {
                              days: session?.user.premiumDays,
                            })}
                            )
                          </>
                        </Case>
                        <Default>
                          <>
                            ({t('quixer.account.status.timeExpired')}{' '}
                            {convertUnixTimeToDate(
                              session?.user.premiumDateExpireUnixTime || 0,
                              locale
                            )}
                            ,{' '}
                            {t('quixer.account.status.balance', {
                              days: session?.user.premiumDays,
                            })}
                            )
                          </>
                        </Default>
                      </Switch>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.tibiaCoins')}
                </td>
                <td data-qx-general-information-value>
                  <div data-qx-general-information-coins>
                    <span>
                      {user.coins}
                      <Image
                        src={CoinsTransferableIcon}
                        alt="coins tranferable"
                      />
                    </span>
                    <span>
                      {user.coins_transferable}

                      <Image
                        src={CoinsNonTransferableIcon}
                        alt="coins not transferable"
                      />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.loyaltyPoints')}
                </td>
                <td data-qx-general-information-value>187</td>
              </tr>
              <tr>
                <td data-qx-general-information-label>
                  {t('quixer.account.general.labels.loyaltyTitle')}
                </td>
                <td data-qx-general-information-value>
                  <div data-qx-general-information-loyalty>
                    <span data-qx-general-information-loyalty-title>
                      Sentinel of Tibia
                    </span>
                    <span data-qx-general-information-loyalty-next>
                      (Promotion to: Steward of Tibia at 200 Loyalty Points)
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div data-qx-general-information-actions>
          <ButtonLink
            variant="info"
            href="/account/management/change-password"
            text={t('quixer.account.actions.changePassword')}
          />
          <ButtonLink
            variant="info"
            href="/account/management/change-email"
            text={t('quixer.account.actions.changeEmail')}
          />
          <ButtonLink
            variant="red"
            href="/account/management/terminate"
            text={t('quixer.account.actions.terminate')}
          />
        </div>
      </div>
    </Container>
  )
}

export default GeneralInformationSection
