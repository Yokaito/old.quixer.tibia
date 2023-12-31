import CharacterEditSection from '@/components/account/CharacterEditSection'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getI18n } from '@/sdk/locales/server'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    locale: string
    name: string
  }
}

export default async function EditCharacterPage({ params: { name } }: Props) {
  const t = await getI18n()
  const convertedName = decodeURIComponent(name)
  const player = await serverClient.players.getMyByName(convertedName)

  if (!player) {
    redirect('/account')
  }

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">
          {t('quixer.geral.titleSectionEditCharacter')}
        </h1>
      </SectionHeader>
      <InnerSection>
        <CharacterEditSection player={player} />
      </InnerSection>
    </Section>
  )
}
