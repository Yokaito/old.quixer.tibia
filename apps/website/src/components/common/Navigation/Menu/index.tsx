import { MenuBox } from '@/components/ui'
import { MenuItem } from './Item'
import { getI18n } from '@/sdk/locales/server'

const getMenuTranslated = async () => {
  const t = await getI18n()
  return [
    {
      icon: 'News',
      label: t('quixer.menu.item.news'),
      subItem: [
        {
          label: t('quixer.menu.item.latest-news'),
          href: '/',
        },
        {
          label: t('quixer.menu.item.news-archive'),
          href: '/news',
        },
        {
          label: t('quixer.menu.item.event-schedule'),
          href: '/events',
        },
      ],
    },
    {
      icon: 'Citizen',
      label: t('quixer.menu.item.community'),
      subItem: [
        {
          label: t('quixer.menu.item.guilds'),
          href: '/guilds',
        },
      ],
    },
  ]
}

export const Menu = async () => {
  const menuData = await getMenuTranslated()

  return (
    <div className="flex">
      <MenuBox showBackground={false}>
        {menuData.map((item) => (
          <MenuItem {...item} key={item.label} />
        ))}
      </MenuBox>
    </div>
  )
}

export default Menu
