import XIcon from '@/assets/images/geral/icon_no.png'
import { getCurrentLocale, getI18n } from '@/sdk/locales/server'
import { defaultFormat } from '@/sdk/utils/date-format'

import Image from 'next/image'

type Props = {
  timeToDeletion: number
}

export const DeletionStatus = async ({ timeToDeletion }: Props) => {
  const locale = getCurrentLocale()
  const t = await getI18n()

  if (timeToDeletion <= 0) return null

  return (
    <span className="relative group">
      <div
        className="min-w-[200px] absolute bottom-0 p-2 my-6 text-sm transition-opacity border rounded-lg opacity-0 bg-800 text-secondary border-secondary group-hover:opacity-100 text-center flex flex-col left-1/2
    -translate-x-1/2 "
      >
        <span className="">{t('quixer.warning.deletion')}</span>
        <span className="text-secondary">
          {defaultFormat(
            new Date(timeToDeletion * 1000),
            locale
          ).toLocaleString()}
        </span>
      </div>
      <Image
        src={XIcon}
        width={12}
        height={12}
        alt="character deletion is scheduled"
      />
    </span>
  )
}
