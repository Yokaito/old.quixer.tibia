'use client'

import Image, { StaticImageData } from 'next/image'

import { useState } from 'react'
import Plus from '@/assets/images/buttons/plus.gif'
import Minus from '@/assets/images/buttons/minus.gif'

type Props = {
  date: Date
  icon: StaticImageData
  content: string
  inverted: boolean
}

export const NewstickerItem = ({ content, date, icon, inverted }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`flex flex-row gap-1 p-[2px] items-start overflow-hidden text-secondary font-roboto text-sm cursor-pointer select-none bg-600 ${
        inverted && 'bg-500'
      }`}
      onClick={() => setOpen(!open)}
    >
      <Image src={icon} alt="icon" />
      <span className="text-sm leading-5">{date.toLocaleDateString()}</span>-
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
