import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import CommunityIcon from '@/assets/images/icons/16/newsicon_community_small.png'
import FixIcon from '@/assets/images/icons/16/newsicon_technical_small.png'
import NewstickerItem from './Item'
import { getI18n } from '@/sdk/locales/server'

const mockData = [
  {
    date: new Date(),
    icon: CommunityIcon,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    date: new Date(),
    icon: FixIcon,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    date: new Date(),
    icon: FixIcon,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    date: new Date(),
    icon: CommunityIcon,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    date: new Date(),
    icon: CommunityIcon,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export const NewstickerSection = async () => {
  const t = await getI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.newsTicker')}</h1>
      </SectionHeader>
      <InnerSection>
        <div className="flex flex-col">
          {mockData.map((item, idx) => {
            const isEven = (idx + 1) % 2 === 0

            return (
              <NewstickerItem
                {...item}
                inverted={isEven}
                key={item.date.toString()}
              />
            )
          })}
        </div>
      </InnerSection>
    </Section>
  )
}

export default NewstickerSection
