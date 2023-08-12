import { NewstickerSection } from '@/components/sections'
import { getI18n, getCurrentLocale } from '@/locales/server'

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()

  return (
    <>
      <NewstickerSection />
      <div>
        <span>Current Locale: {locale}</span>
        <p>{t('quixer.box.login.login')}</p>
      </div>
    </>
  )
}
