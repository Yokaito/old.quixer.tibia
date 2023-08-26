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
              {session?.user.isPremium || otConfig.server.premiumIsFree
                ? t('quixer.account.status.premium')
                : t('quixer.account.status.free')}
            </h2>
            <p>
              {otConfig.server.premiumIsFree
                ? `${t('quixer.account.status.timeLeft')} Inf`
                : session?.user.isPremium
                ? t('quixer.account.status.timeLeft')
                : ` ${t(
                    'quixer.account.status.timeExpired'
                  )}} ${convertUnixTimeToDate(
                    session?.user.premiumDateExpireUnixTime || 0,
                    locale
                  )}`}
            </p>
            <p>
              {t('quixer.account.status.balance', {
                days: otConfig.server.premiumIsFree
                  ? 'Inf'
                  : session?.user.premiumDays,
              })}
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
