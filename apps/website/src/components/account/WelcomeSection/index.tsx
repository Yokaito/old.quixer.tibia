import Image from 'next/image'

import BorderTitle from '@/assets/images/borders/headline-bracer.gif'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { getI18n } from '@/sdk/locales/server'
import styles from './styles.module.scss'

export const AccountWelcomeSection = async () => {
  const session = await getServerSession(authOptions)
  const t = await getI18n()

  return (
    <div
      className={styles.qxAccountWelcomeSection}
      data-qx-account-section-title-wrapper
    >
      <Image
        src={BorderTitle}
        alt="border"
        data-qx-account-section-title-border
      />
      <h1 data-qx-account-section-title>
        {t('quixer.account.hello', {
          name: session?.user?.name,
        })}
      </h1>
      <Image
        src={BorderTitle}
        alt="border"
        data-qx-account-section-title-border="right"
      />
    </div>
  )
}
