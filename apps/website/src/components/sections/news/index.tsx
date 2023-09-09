import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { serverClient } from '@/sdk/lib/trpc/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { AccountType } from '@/sdk/constants'
import { ItemNews } from './Item'
import { getCurrentLocale, getI18n } from '@/sdk/locales/server'

export const NewsSection = async () => {
  const data = await serverClient.news.all({
    take: 5,
  })
  const session = await getServerSession(authOptions)
  const locale = getCurrentLocale()
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.news')}</h1>
      </SectionHeader>
      <InnerSection className="p-2">
        {data.map((news) => (
          <ItemNews
            content={news.content}
            createdAt={news.createdAt}
            title={news.title}
            id={news.id}
            type_news={news.type_news.name}
            key={news.id}
            showEdit={(session?.user?.type ?? 1) >= AccountType.GAME_MASTER}
            locale={locale}
          />
        ))}
      </InnerSection>
    </Section>
  )
}

export default NewsSection
