import { Container, Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'

export const CreateAccountSection = () => {
  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">Create Account</h1>
      </SectionHeader>
      <InnerSection>
        <Container title="Create New Account">
          <></>
        </Container>
      </InnerSection>
    </Section>
  )
}

export default CreateAccountSection
