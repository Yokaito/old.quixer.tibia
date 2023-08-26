import { Container, Section } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { getI18n } from '@/locales/server'
import { LoginForm } from '@/components/account/LoginSection/form'

export const LoginSection = async () => {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.account.management')}</h1>
      </SectionHeader>
      <InnerSection>
        <Container title={t('quixer.account.form')}>
          <InnerContainer>
            <LoginForm />
          </InnerContainer>
        </Container>
      </InnerSection>
    </Section>
  )
}

export default LoginSection
