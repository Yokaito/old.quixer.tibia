import Image from 'next/image'
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
    <Container title={t('quixer.account.titles.status')}>
      <InnerContainer>
        <div
          data-qx-account-section-status
          className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between"
        >
          <div data-qx-account-section-info className="flex items-center gap-3">
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

            <div
              data-qx-account-section-info-text
              className="flex flex-col gap-1"
            >
              <h2
                className={`${
                  (session?.user.isPremium || otConfig.server.premiumIsFree) &&
                  'text-success'
                } text-lg font-bold text-error`}
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
              <p className="font-normal text-[12px] text-secondary">
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
              <p className="font-normal text-[12px] text-secondary">
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
          <div
            data-qx-account-section-status-actions
            className="flex flex-wrap justify-between gap-1 2xl:flex-col"
          >
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
        <div
          data-qx-account-premium-benefits-list
          className="grid items-center grid-cols-1 gap-2 2xl:gap-4 2xl:grid-cols-3"
        >
          <div
            data-qx-account-premium-benefits-item
            className="flex items-center gap-1"
          >
            <Image src={IconPremium2} alt="icon" />
            <span className="text-sm font-normal text-left text-secondary font-poppins">
              {t('quixer.account.premium.benefits.outfits')}
            </span>
          </div>
          <div
            data-qx-account-premium-benefits-item
            className="flex items-center gap-1"
          >
            <Image src={IconPremium1} alt="icon" />
            <span className="text-sm font-normal text-left text-secondary font-poppins">
              {t('quixer.account.premium.benefits.hunting')}
            </span>
          </div>
          <div
            data-qx-account-premium-benefits-item
            className="flex items-center gap-1"
          >
            <Image src={IconPremium3} alt="icon" />
            <span className="text-sm font-normal text-left text-secondary font-poppins">
              {t('quixer.account.premium.benefits.battle')}
            </span>
          </div>
        </div>
      </InnerContainer>
    </Container>
  )
}
