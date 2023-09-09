import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'

export default async function AdminNewsCreatePage() {
  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">Create News</h1>
      </SectionHeader>
      <InnerSection>Teste</InnerSection>
    </Section>
  )
}
