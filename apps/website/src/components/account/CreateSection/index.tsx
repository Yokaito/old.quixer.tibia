import { Container, Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { FormCreateAccount } from './form'
import { getI18n } from '@/locales/server'

export const CreateAccountSection = async () => {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.geral.createAccount')}</h1>
      </SectionHeader>
      <InnerSection>
        <Container title={t('quixer.geral.createAccount')}>
          <FormCreateAccount />
        </Container>
      </InnerSection>
    </Section>
  )
}

export default CreateAccountSection
