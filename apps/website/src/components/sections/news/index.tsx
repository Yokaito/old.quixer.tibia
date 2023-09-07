import { Case, Section, Switch } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import CommunityImg from '@/assets/images/icons/32/newsicon_community_big.png'
import DevelopmentImg from '@/assets/images/icons/32/newsicon_development_big.png'
import SupportImg from '@/assets/images/icons/32/newsicon_support_big.png'
import ToolsEdit from '@/assets/images/icons/16/tools.png'
import Image from 'next/image'
import { serverClient } from '@/sdk/lib/trpc/server'
import { defaultFormat } from '@/sdk/utils/date-format'
import { getCurrentLocale } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/sdk/lib/nextauth'
import { AccountType } from '@/sdk/constants'
import Link from 'next/link'

// https://github.com/jodit/jodit-react

export const NewsSection = async () => {
  const data = await serverClient.news.all({
    take: 5,
  })
  const currentLocale = getCurrentLocale()
  const session = await getServerSession(authOptions)

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">news</h1>
      </SectionHeader>
      <InnerSection className="p-2">
        {data.map((news) => (
          <div key={news.id} className="flex flex-col">
            <SectionHeader backgroundColor="red">
              <div className="flex items-center w-full gap-2 text-[12px] text-white relative">
                <div className="flex items-center gap-2">
                  <Switch>
                    <Case condition={news.type_news.name === 'community'}>
                      <Image src={CommunityImg} alt="community icon" />
                    </Case>
                    <Case condition={news.type_news.name === 'development'}>
                      <Image src={DevelopmentImg} alt="development icon" />
                    </Case>
                    <Case condition={news.type_news.name === 'support'}>
                      <Image src={SupportImg} alt="support icon" />
                    </Case>
                  </Switch>

                  <span className="font-martel min-w-max">
                    {news.createdAt
                      ? defaultFormat(news.createdAt, currentLocale)
                      : 'unknown'}
                  </span>
                </div>
                <span>{`-`}</span>
                <h1 className="max-w-[180px]  md:max-w-xl text-sm font-bold font-roboto line-clamp-1">
                  {news.title}
                </h1>

                {(session?.user?.type ?? 1) >= AccountType.GAME_MASTER && (
                  <div className="absolute right-0">
                    <Link href={`/admin/news/edit/${news.id}`}>
                      <Image src={ToolsEdit} alt="community icon" />
                    </Link>
                  </div>
                )}
              </div>
            </SectionHeader>
            <div
              className="p-3 text-sm text-secondary font-poppins"
              dangerouslySetInnerHTML={{
                __html: news.content,
              }}
            />
          </div>
        ))}
      </InnerSection>
    </Section>
  )
}

export default NewsSection
