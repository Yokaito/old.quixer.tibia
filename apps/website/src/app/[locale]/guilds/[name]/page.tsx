import { GuildInfoSection } from '@/components/guilds/GuildInfoSection'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getI18n } from '@/sdk/locales/server'

type Props = {
  params: {
    locale: string
    name: string
  }
}

export default async function AdminNewsEditIdPage({ params }: Props) {
  const t = await getI18n()
  const normalizedName = decodeURIComponent(params.name)
  const guild = await serverClient.guilds.findByName(normalizedName)

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">
          {t('quixer.geral.guild')} {guild.name}
        </h1>
      </SectionHeader>
      <InnerSection>
        <GuildInfoSection {...guild} />
      </InnerSection>
    </Section>
  )
}
