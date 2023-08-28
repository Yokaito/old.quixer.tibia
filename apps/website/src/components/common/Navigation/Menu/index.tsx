import styles from './menu.module.scss'
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
  ]
}

export const Menu = async () => {
  const menuData = await getMenuTranslated()

  return (
    <div data-qx-menu-wrapper className={`${styles.qxMenu}`}>
      <MenuBox showBackground={false}>
        {menuData.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </MenuBox>
    </div>
  )
}

export default Menu
