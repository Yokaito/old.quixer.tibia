import { CreateAccountSection } from '@/components/account'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { getI18n } from '@/locales/server'

export default async function Page() {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.geral.createAccount')}</h1>
      </SectionHeader>
      <InnerSection>
        <CreateAccountSection />
      </InnerSection>
    </Section>
  )
}
