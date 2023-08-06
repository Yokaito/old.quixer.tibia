'use client'

import Link from 'next/link'
import styles from './menu-item.module.scss'
import { useState } from 'react'
import Image from 'next/image'

import Icon1 from '@/assets/images/icons/32/armillary_sphere.gif'
import Icon2 from '@/assets/images/icons/32/baby_munster.gif'
import Icon3 from '@/assets/images/icons/32/bookworm_doll.gif'
import Icon4 from '@/assets/images/icons/32/citizen_doll.gif'
import Icon5 from '@/assets/images/icons/32/goromaphone.gif'
import Icon6 from '@/assets/images/icons/32/journal_shield.gif'
import Icon7 from '@/assets/images/icons/32/loremaster_doll.gif'
import Icon8 from '@/assets/images/icons/32/news-menu.gif'
import Icon9 from '@/assets/images/icons/32/scroll_of_the_stolen_moment.gif'

const IconsToUse = [
  { icon: Icon1, id: 'Armillary' },
  { icon: Icon2, id: 'Baby' },
  { icon: Icon3, id: 'Bookworm' },
  { icon: Icon4, id: 'Citizen' },
  { icon: Icon5, id: 'Goromaphone' },
  { icon: Icon6, id: 'Journal' },
  { icon: Icon7, id: 'Loremaster' },
  { icon: Icon8, id: 'News' },
  { icon: Icon9, id: 'Scroll' },
]

type MenuItemProps = {
  /**
   * Label of menu item
   */
  label: string
  /**
   * Icon of menu item
   * @default 'News'
   */
  icon: string
  /**
   * Sub items of menu item
   */
  subItem: Array<{
    /**
     * Label of sub item
     */
    label: string
    /**
     * Href of sub item
     */
    href: string
  }>
}

export const MenuItem = ({ icon, label, subItem }: MenuItemProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const iconToUse = IconsToUse.find((item) => item.id === icon)?.icon || Icon1

  return (
    <div className={`${styles.qxMenuItem}`}>
      <div data-qx-menu-item onClick={() => setShowMenu(!showMenu)}>
        <Image src={iconToUse} alt={label} />
        <span data-qx-menu-item-text className="fondamentoTitle">
          {label}
        </span>
      </div>
      <div data-qx-menu-sub-list data-qx-menu-sub-list-active={showMenu}>
        <div data-qx-chain data-qx-chain-right="false" />
        <div data-qx-chain data-qx-chain-right="true" />
        {subItem.map((subItemMenu, index) => (
          <Link key={index} href={subItemMenu.href} data-qx-menu-sub-item>
            <span data-qx-menu-sub-item-active>{`>`}</span>
            {subItemMenu.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
