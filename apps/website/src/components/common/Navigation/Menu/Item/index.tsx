'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from '@/sdk/locales/client'
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
  const pathname = usePathname()
  const currentLocale = useCurrentLocale()
  const normalizedPathname = pathname.replace(`${currentLocale}`, '')

  const iconToUse = IconsToUse.find((item) => item.id === icon)?.icon ?? Icon1

  const heightTotal = subItem.length * 18.8

  return (
    <div>
      <div
        className="w-[170px] bg-[url('../assets/images/buttons/button-menu.webp')] bg-no-repeat h-8 px-1 relative cursor-pointer transition-all flex items-center gap-1 hover:filter-hover"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Image src={iconToUse} alt={label} />
        <span className="flex-1 text-base capitalize fondamento-title">
          {label}
        </span>
      </div>
      <div
        className="h-0 overflow-hidden transition-all duration-300 flex flex-col w-[170px] relative px-[2px]"
        style={{ height: showMenu ? `${heightTotal}px` : '0px' }}
      >
        <div
          className="transition-all duration-700 absolute bg-repeat-y w-[7px] h-full top-0 bg-[url('../assets/images/borders/chain.webp')] right-0"
          style={{ height: showMenu ? `${heightTotal}px` : '0px' }}
        />
        <div
          style={{ height: showMenu ? `${heightTotal}px` : '0px' }}
          className="transition-all duration-700 absolute bg-repeat-y w-[7px] h-full top-0 bg-[url('../assets/images/borders/chain.webp')] left-0"
        />
        {subItem.map((subItemMenu) => {
          const isActive = normalizedPathname === subItemMenu.href

          return (
            <Link
              key={subItemMenu.label}
              href={subItemMenu.href}
              className="text-[12px] text-white bg-200 border-b border-primary cursor-pointer py-[2px] px-2 decoration-0 font-poppins line-clamp-1 hover:bg-300 transition-all"
            >
              {isActive && <span className="mr-1">{`>`}</span>}
              {subItemMenu.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
