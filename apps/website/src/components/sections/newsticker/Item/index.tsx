'use client'

import Image, { StaticImageData } from 'next/image'

import { useState } from 'react'
import Plus from '@/assets/images/buttons/plus.gif'
import Minus from '@/assets/images/buttons/minus.gif'
import { defaultFormat } from '@/sdk/utils/date-format'
import { useCurrentLocale } from '@/sdk/locales/client'

type Props = {
  date: Date
  icon: StaticImageData
  content: string
  inverted: boolean
}

export const NewstickerItem = ({ content, date, icon, inverted }: Props) => {
  const [open, setOpen] = useState(false)
  const locale = useCurrentLocale()

  return (
    <article
      className={`flex flex-row gap-1 p-[2px] items-start overflow-hidden text-secondary font-roboto text-sm cursor-pointer select-none  ${
        inverted ? 'bg-500' : 'bg-600'
      }`}
      onClick={() => setOpen(!open)}
    >
      <Image src={icon} alt="icon" />
      <span className="text-sm leading-5 min-w-max">
        {defaultFormat(date, locale)}
      </span>
      -
      <span
        className={`${
          open ? 'h-10 line-clamp-2 ' : 'h-4 line-clamp-1 leading-5'
        } overflow-hidden transition-all`}
      >
        {content}
      </span>
      <Image src={open ? Minus : Plus} alt="icon button" quality={100} />
    </article>
  )
}
export default NewstickerItem
