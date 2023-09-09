import { NewsEditSection } from '@/components/admin/News/EditSection'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getI18n } from '@/sdk/locales/server'

type Props = {
  params: {
    locale: string
    id: string
  }
}

export default async function AdminNewsEditIdPage({ params }: Props) {
  const news = await serverClient.news.getById(Number(params.id))
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.editingNews')}</h1>
      </SectionHeader>
      <InnerSection>
        <NewsEditSection {...news} />
      </InnerSection>
    </Section>
  )
}
