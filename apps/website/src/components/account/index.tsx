import { Container, Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import styles from './account.module.scss'
import Image from 'next/image'

import IconPremium1 from '@/assets/images/icons/32/premium_icon-prey_hunting_task.png'
import IconPremium2 from '@/assets/images/icons/32/premium_icon_outfit.png'
import IconPremium3 from '@/assets/images/icons/32/premium_icon_secondary_battlelists.png'
import BorderTitle from '@/assets/images/borders/headline-bracer.gif'
import InnerContainer from '@/components/ui/Container/Inner'
import { AccountStatusSection } from '@/components/account/StatusSection'
import AccountCharacterList from '@/components/account/CharacterSection'
import { getI18n } from '@/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export const AccountSection = async () => {
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  return (
    <Section className={`${styles.qxAccountSection}`}>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.account.management')}</h1>
      </SectionHeader>
      <InnerSection data-qx-account-section-wrapper>
        <div data-qx-account-section-title-wrapper>
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
        <Container title={t('quixer.account.titles.status')}>
          <AccountStatusSection />
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
        <Container title={t('quixer.account.titles.characters')}>
          <AccountCharacterList />
        </Container>
      </InnerSection>
    </Section>
  )
}

export default AccountSection
