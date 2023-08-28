import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { getI18n } from '@/sdk/locales/server'
import { GeneralInformationSection } from '@/components/Management'

export default async function AccountManagement() {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.account.management')}</h1>
      </SectionHeader>
      <InnerSection>
        <GeneralInformationSection />
      </InnerSection>
    </Section>
  )
}
