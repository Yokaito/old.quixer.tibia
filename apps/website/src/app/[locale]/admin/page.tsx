import { NewsListSection } from '@/components/admin/NewsSection'
import WorldsSection from '@/components/admin/WorldsSection'
import { Case, Section, Switch } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { AccountType } from '@/sdk/constants'
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
          <Case condition={!session || session?.user.type <= AccountType.TUTOR}>
            <></>
          </Case>
          <Case
            condition={
              !session || session?.user.type <= AccountType.SENIOR_TUTOR
            }
          >
            <NewsListSection />
          </Case>
          <Case
            condition={
              !session || session?.user.type <= AccountType.GAME_MASTER
            }
          >
            <NewsListSection />
          </Case>
          <Case condition={!session || session?.user.type <= AccountType.GOD}>
            <WorldsSection />
            <NewsListSection />
          </Case>
        </Switch>
      </InnerSection>
    </Section>
  )
}
