import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { CreateCharacterSection } from '@/components/account'
import { getI18n } from '@/sdk/locales/server'

export default async function AccountCharacterCreate() {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">
          {t('quixer.account.characters.create')}
        </h1>
      </SectionHeader>
      <InnerSection data-qx-account-section-wrapper>
        <CreateCharacterSection />
      </InnerSection>
    </Section>
  )
}
