import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import styles from './newsticker.module.scss'
import InnerSection from '@/components/ui/Section/Inner'
import CommunityIcon from '@/assets/images/icons/16/newsicon_community_small.png'
import FixIcon from '@/assets/images/icons/16/newsicon_technical_small.png'
import NewstickerItem from './Item'

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

export const Newsticker = () => {
  return (
    <Section className={`${styles.qxNewsticker}`}>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">news ticker</h1>
      </SectionHeader>
      <InnerSection>
        <div data-qx-newsticker-wrapper>
          {mockData.map((item, index) => {
            const isEven = (index + 1) % 2 === 0

            return <NewstickerItem {...item} inverted={isEven} key={index} />
          })}
        </div>
      </InnerSection>
    </Section>
  )
}

export default Newsticker
