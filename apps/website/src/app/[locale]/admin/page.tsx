import WorldsSection from '@/components/admin/WorldsSection'
import { Case, Section, Switch } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { PlayerType } from '@/sdk/constants'
import authOptions from '@/sdk/lib/nextauth'
import { getServerSession } from 'next-auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">Server Management</h1>
      </SectionHeader>
      <InnerSection>
        <Switch>
          <Case condition={session!?.user.type >= PlayerType.TUTOR}>
            <WorldsSection />
          </Case>
        </Switch>
      </InnerSection>
    </Section>
  )
}
