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
import { Case, Container, Default, Switch } from '@/components/ui'
import IconPremium1 from '@/assets/images/icons/32/premium_icon-prey_hunting_task.png'
import IconPremium2 from '@/assets/images/icons/32/premium_icon_outfit.png'
import IconPremium3 from '@/assets/images/icons/32/premium_icon_secondary_battlelists.png'
import env from '@/sdk/env'

export const AccountStatusSection = async () => {
  const locale = getCurrentLocale()
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  return (
    <Container title={t('quixer.account.titles.status')}>
      <InnerContainer>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <Switch>
              <Case
                condition={
                  session?.user.isPremium || env.NEXT_PUBLIC_PREMIUM_IS_FREE
                }
              >
                <Image src={StatusImagePremium} alt="status account" />
              </Case>
              <Default>
                <Image src={StatusImageFree} alt="status account" />
              </Default>
            </Switch>

            <div className="flex flex-col gap-1">
              <h2
                className={`${
                  (session?.user.isPremium ||
                    env.NEXT_PUBLIC_PREMIUM_IS_FREE) &&
                  'text-success'
                } text-lg font-bold text-error`}
              >
                <Switch>
                  <Case condition={env.NEXT_PUBLIC_PREMIUM_IS_FREE}>
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
                  <Case condition={env.NEXT_PUBLIC_PREMIUM_IS_FREE}>
                    <>{t('quixer.account.status.freePermanent')}</>
                  </Case>
                  <Case condition={session?.user.isPremium as boolean}>
                    <>
                      {t('quixer.account.status.timeLeft')}{' '}
                      {convertUnixTimeToDate(
                        session?.user.premiumDateExpireUnixTime ?? 0,
                        locale
                      )}
                    </>
                  </Case>
                  <Default>
                    <>
                      {t('quixer.account.status.timeExpired')}{' '}
                      {convertUnixTimeToDate(
                        session?.user.premiumDateExpireUnixTime ?? 0,
                        locale
                      )}
                    </>
                  </Default>
                </Switch>
              </p>
              <p className="font-normal text-[12px] text-secondary">
                <Switch>
                  <Case condition={env.NEXT_PUBLIC_PREMIUM_IS_FREE}>
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
          <div className="flex flex-wrap justify-between gap-1 xl:flex-col">
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
        <div className="grid items-center grid-cols-1 gap-2 2xl:gap-4 2xl:grid-cols-3">
          <div className="flex items-center gap-1">
            <Image src={IconPremium2} alt="icon" />
            <span className="text-sm font-normal text-left text-secondary font-poppins">
              {t('quixer.account.premium.benefits.outfits')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={IconPremium1} alt="icon" />
            <span className="text-sm font-normal text-left text-secondary font-poppins">
              {t('quixer.account.premium.benefits.hunting')}
            </span>
          </div>
          <div className="flex items-center gap-1">
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
