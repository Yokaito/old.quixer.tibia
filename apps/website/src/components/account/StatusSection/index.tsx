import Image from 'next/image'
import styles from './status-section.module.scss'
import InnerContainer from '@/components/ui/Container/Inner'
import { Button } from '@/components/ui'
import StatusImage from '@/assets/images/status/account-status_green.gif'

export const AccountStatusSection = () => {
  return (
    <InnerContainer>
      <div
        data-qx-account-section-status
        className={`${styles.qxAccountStatusSection}`}
      >
        <div data-qx-account-section-info>
          <Image src={StatusImage} alt="status account" />
          <div data-qx-account-section-info-text>
            <h2>Free Account</h2>
            <p>Your Premium Time expired at Jul 06 2021, 01:05:59 CEST.</p>
            <p>(Balance of Premium Time: 0 days)</p>
          </div>
        </div>
        <div data-qx-account-section-status-actions>
          <Button variant="info">Menage Account</Button>
          <Button variant="green">Get Premium</Button>
          <Button variant="red">Logout</Button>
        </div>
      </div>
    </InnerContainer>
  )
}
