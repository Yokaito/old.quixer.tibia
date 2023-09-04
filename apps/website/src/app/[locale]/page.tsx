import { NewstickerSection } from '@/components/sections'
import { getCurrentLocale } from '@/sdk/locales/server'

export default async function Home() {
  const locale = getCurrentLocale()

  return (
    <>
      <NewstickerSection />
      <div>
        <span className="text-3xl text-white sm:text-sm shadow-primary font-fondamento">
          Current Locale: {locale}
        </span>
      </div>
    </>
  )
}
