import Image from 'next/image'
import styles from './status-section.module.scss'
import InnerContainer from '@/components/ui/Container/Inner'
import { ButtonLink } from '@/components/ui/Button/ButtonAsLink'
import StatusImagePremium from '@/assets/images/status/account-status_green.gif'
import StatusImageFree from '@/assets/images/status/account-status_red.gif'
import { getCurrentLocale, getI18n } from '@/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import { convertUnixTimeToDate } from '@/utils/date-format'
import { ButtonSignOut } from '@/components/ui/Button/ButtonSignOut'
import { otConfig } from '@/quixer'
import { Case, Default, Switch } from '@/components/ui'

export const AccountStatusSection = async () => {
  const locale = getCurrentLocale()
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  return (
    <InnerContainer>
      <div
        data-qx-account-section-status
        className={`${styles.qxAccountStatusSection}`}
      >
        <div data-qx-account-section-info>
          {session?.user.isPremium ? (
            <Image src={StatusImagePremium} alt="status account" />
          ) : (
            <Image src={StatusImageFree} alt="status account" />
          )}

          <div data-qx-account-section-info-text>
            <h2 data-qx-account-section-premium={session?.user.isPremium}>
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
  )
}
