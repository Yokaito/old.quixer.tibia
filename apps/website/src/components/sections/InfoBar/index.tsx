import { Section } from '@/components/ui'
import Icon from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/Section/Header'
import styles from './info-bar.module.scss'
import Link from 'next/link'

export const InfoBar = () => {
  return (
    <Section className={`${styles.qxInfoBar}`}>
      <SectionHeader>
        <div data-qx-info-bar-wrapper>
          <div data-qx-info-bar-streamings>
            <Link data-qx-info-bar-link href="/">
              <Icon name="Twitch" width={20} height={20} />
              <Icon name="Broadcast" width={12} height={12} />
              <span>194</span>
              <Icon name="Eye" width={12} height={12} />
              <span>4417</span>
            </Link>
            <Link data-qx-info-bar-link href="/">
              <Icon name="Youtube" width={20} height={20} />
              <Icon name="Broadcast" width={12} height={12} />
              <span>194</span>
              <Icon name="Eye" width={12} height={12} />
              <span>4417</span>
            </Link>
            <Link data-qx-info-bar-link href="/">
              <Icon name="Download" width={20} height={20} />
              <span>Fankit</span>
            </Link>
          </div>
          <div data-qx-info-bar-status>
            <Link data-qx-info-bar-link href="/">
              <Icon name="UsersThree" width={20} height={20} />
              <span>3323 Players Online</span>
            </Link>
          </div>
        </div>
      </SectionHeader>
    </Section>
  )
}
