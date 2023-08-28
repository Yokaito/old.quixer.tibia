import Image from 'next/image'
import styles from './status-section.module.scss'
import InnerContainer from '@/components/ui/Container/Inner'
import { ButtonLink } from '@/components/ui/Button/ButtonAsLink'
import StatusImagePremium from '@/assets/images/status/account-status_green.gif'
import StatusImageFree from '@/assets/images/status/account-status_red.gif'
import { getCurrentLocale, getI18n } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { convertUnixTimeToDate } from '@/sdk/utils/date-format'
import { ButtonSignOut } from '@/components/ui/Button/ButtonSignOut'
import { otConfig } from '@/quixer'
import { Case, Container, Default, Switch } from '@/components/ui'
import IconPremium1 from '@/assets/images/icons/32/premium_icon-prey_hunting_task.png'
import IconPremium2 from '@/assets/images/icons/32/premium_icon_outfit.png'
import IconPremium3 from '@/assets/images/icons/32/premium_icon_secondary_battlelists.png'

export const AccountStatusSection = async () => {
  const locale = getCurrentLocale()
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  return (
    <Container
      className={styles.qxAccountStatusSection}
      title={t('quixer.account.titles.status')}
    >
      <InnerContainer>
        <div data-qx-account-section-status>
          <div data-qx-account-section-info>
            <Switch>
              <Case
                condition={
                  session?.user.isPremium || otConfig.server.premiumIsFree
                }
              >
                <Image src={StatusImagePremium} alt="status account" />
              </Case>
              <Default>
                <Image src={StatusImageFree} alt="status account" />
              </Default>
            </Switch>

            <div data-qx-account-section-info-text>
              <h2
                data-qx-account-section-premium={
                  session?.user.isPremium || otConfig.server.premiumIsFree
                }
              >
                <Switch>
                  <Case condition={otConfig.server.premiumIsFree}>
                    <>{t('quixer.account.status.freePremium')}</>
                  </Case>
                  <Case condition={session?.user.isPremium as boolean}>
                    <>{t('quixer.account.status.premium')}</>
                  </Case>
                  <Default>
                    <>{t('quixer.account.status.free')}</>
                  </Default>
                </Switch>
              </h2>
              <p>
                <Switch>
                  <Case condition={otConfig.server.premiumIsFree}>
                    <>{t('quixer.account.status.freePermanent')}</>
                  </Case>
                  <Case condition={session?.user.isPremium as boolean}>
                    <>
                      {t('quixer.account.status.timeLeft')}{' '}
                      {convertUnixTimeToDate(
                        session?.user.premiumDateExpireUnixTime || 0,
                        locale
                      )}
                    </>
                  </Case>
                  <Default>
                    <>
                      {t('quixer.account.status.timeExpired')}{' '}
                      {convertUnixTimeToDate(
                        session?.user.premiumDateExpireUnixTime || 0,
                        locale
                      )}
                    </>
                  </Default>
                </Switch>
              </p>
              <p>
                <Switch>
                  <Case condition={otConfig.server.premiumIsFree}>
                    <>
                      {t('quixer.account.status.balance', {
                        days: 0,
                      })}
                    </>
                  </Case>
                  <Default>
                    <>
                      {t('quixer.account.status.balance', {
                        days: session?.user.premiumDays,
                      })}
                    </>
                  </Default>
                </Switch>
              </p>
            </div>
          </div>
          <div data-qx-account-section-status-actions>
            <ButtonLink
              href="/account/management"
              variant="info"
              text={t('quixer.account.actions.menage')}
            />
            <ButtonLink
              href="/shop/premium"
              variant="green"
              text={t('quixer.account.actions.premium')}
            />
            <ButtonSignOut variant="button" />
          </div>
        </div>
      </InnerContainer>
      <InnerContainer>
        <div data-qx-account-premium-benefits-list>
          <div data-qx-account-premium-benefits-item>
            <Image src={IconPremium2} alt="icon" />
            <span>{t('quixer.account.premium.benefits.outfits')}</span>
          </div>
          <div data-qx-account-premium-benefits-item>
            <Image src={IconPremium1} alt="icon" />
            <span>{t('quixer.account.premium.benefits.hunting')}</span>
          </div>
          <div data-qx-account-premium-benefits-item>
            <Image src={IconPremium3} alt="icon" />
            <span>{t('quixer.account.premium.benefits.battle')}</span>
          </div>
        </div>
      </InnerContainer>
    </Container>
  )
}
