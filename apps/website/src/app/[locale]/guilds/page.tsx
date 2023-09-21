import { ListGuildsSection } from '@/components/guilds/ListGuildsSection'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getI18n } from '@/sdk/locales/server'

export default async function GuildsPage() {
  const t = await getI18n()
  const worlds = await serverClient.worlds.all()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.guilds')}</h1>
      </SectionHeader>
      <InnerSection>
        <ListGuildsSection worlds={worlds} />
      </InnerSection>
    </Section>
  )
}
