import { getI18n } from '@/locales/server'
import { Section } from '../ui'
import { SectionHeader } from '../ui/Section/Header'
import InnerSection from '../ui/Section/Inner'
import GeneralInformationSection from './GeneralInformationSection'

export const Management = async () => {
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

export default Management
