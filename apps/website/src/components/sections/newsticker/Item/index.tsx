'use client'

import Image, { StaticImageData } from 'next/image'
import styles from './item.module.scss'
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
      data-qx-newsticker-item
      data-qx-newsticker-item-open={open}
      data-qx-newsticker-item-inverted={inverted}
      className={`${styles.qxNewstickerItem}`}
      onClick={() => setOpen(!open)}
    >
      <Image src={icon} alt="icon" />
      <span data-qx-newsticker-item-date>{date.toLocaleDateString()}</span>-
      <span data-qx-newsticker-item-content>{content}</span>
      <Image src={open ? Minus : Plus} alt="icon button" quality={100} />
    </article>
  )
}
export default NewstickerItem
