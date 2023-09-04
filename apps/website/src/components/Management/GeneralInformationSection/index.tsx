import { Case, Container, Default, Switch } from '@/components/ui'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import CoinsTransferableIcon from '@/assets/images/icons/global/icon-tibiacoin.png'
import CoinsNonTransferableIcon from '@/assets/images/icons/global/icon-tibiacointrusted.png'
import Image from 'next/image'
import { convertUnixTimeToDate } from '@/sdk/utils/date-format'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getCurrentLocale, getI18n } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { otConfig } from '@/quixer'

export const GeneralInformationSection = async () => {
  const user = await serverClient.account.myInfo()
  const session = await getServerSession(authOptions)
  const locale = getCurrentLocale()
  const t = await getI18n()

  return (
    <Container title={t('quixer.account.titles.general')}>
      <div className="flex flex-col gap-2 h-max">
        <div className="shadow-container outline outline-1 outline-secondary bg-600">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.email')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  {user.email}
                </td>
              </tr>
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.created')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  {convertUnixTimeToDate(user.creation, locale)}
                </td>
              </tr>
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.lastLogin')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  not implemented
                </td>
              </tr>
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.accountStatus')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  <div className="flex flex-col">
                    <span
                      className={`${
                        (otConfig.server.premiumIsFree ||
                          session?.user?.isPremium) &&
                        'text-success'
                      } text-error font-bold`}
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
                    <span className="text-[12px]">
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
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.tibiaCoins')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
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
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.loyaltyPoints')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  187
                </td>
              </tr>
              <tr className="odd:bg-900">
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm w-[110px] 2xl:w-[150px]">
                  {t('quixer.account.general.labels.loyaltyTitle')}
                </td>
                <td className="py-1 px-[2px] text-start border border-quintenary text-secondary text-sm pl-2">
                  <div className="flex flex-col">
                    <span className="font-bold">Sentinel of Tibia</span>
                    <span className="text-[12px]">
                      (Promotion to: Steward of Tibia at 200 Loyalty Points)
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-end justify-end gap-2 2xl:gap-3 2xl:flex-row">
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
