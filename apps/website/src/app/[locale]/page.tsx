import { NewstickerSection } from '@/components/sections'
import { NewsSection } from '@/components/sections/news'
import { getCurrentLocale } from '@/sdk/locales/server'
import { Outfit } from './Outfit'

export default async function Home() {
  const locale = getCurrentLocale()

  return (
    <>
      <NewstickerSection />
      <NewsSection />
      <div>
        <span className="text-3xl text-white sm:text-sm shadow-primary font-fondamento">
          Current Locale: {locale}
        </span>
      </div>
      <Outfit />
    </>
  )
}
