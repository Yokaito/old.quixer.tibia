import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import authOptions from '@/sdk/lib/nextauth'
import { getI18n } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CreateGuildSection } from '@/components/guilds/CreateGuildSection'

export default async function GuildsPage() {
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/account')
  }

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.createGuild')}</h1>
      </SectionHeader>
      <InnerSection>
        <CreateGuildSection />
      </InnerSection>
    </Section>
  )
}
