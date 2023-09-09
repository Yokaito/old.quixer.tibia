import { Case, Switch } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import { defaultFormat } from '@/sdk/utils/date-format'
import Image from 'next/image'
import Link from 'next/link'
import CommunityImg from '@/assets/images/icons/32/newsicon_community_big.png'
import DevelopmentImg from '@/assets/images/icons/32/newsicon_development_big.png'
import SupportImg from '@/assets/images/icons/32/newsicon_support_big.png'
import ToolsEdit from '@/assets/images/icons/16/tools.png'

type Props = {
  id: number
  type_news: string
  createdAt: Date | null
  title: string
  showEdit?: boolean
  content: string
  locale: 'pt' | 'en' | 'fr'
}

export const ItemNews = ({
  id,
  createdAt,
  title,
  type_news,
  showEdit = false,
  content,
  locale,
}: Props) => {
  return (
    <div className="flex flex-col">
      <SectionHeader backgroundColor="red">
        <div className="flex items-center w-full gap-2 text-[12px] text-white relative">
          <div className="flex items-center gap-2">
            <Switch>
              <Case condition={type_news === 'community'}>
                <Image src={CommunityImg} alt="community icon" />
              </Case>
              <Case condition={type_news === 'development'}>
                <Image src={DevelopmentImg} alt="development icon" />
              </Case>
              <Case condition={type_news === 'support'}>
                <Image src={SupportImg} alt="support icon" />
              </Case>
            </Switch>

            <span className="font-martel min-w-max">
              {createdAt ? defaultFormat(createdAt, locale) : 'unknown'}
            </span>
          </div>
          <span>{`-`}</span>
          <h1 className="max-w-[180px]  md:max-w-xl text-sm font-bold font-roboto line-clamp-1">
            {title}
          </h1>
          <Switch>
            <Case condition={showEdit}>
              <div className="absolute right-0">
                <Link href={`/admin/news/edit/${id}`}>
                  <Image src={ToolsEdit} alt="community icon" />
                </Link>
              </div>
            </Case>
          </Switch>
        </div>
      </SectionHeader>
      <div
        className="p-3 text-sm text-secondary font-poppins"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  )
}
