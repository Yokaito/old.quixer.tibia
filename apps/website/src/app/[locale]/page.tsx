import { NewstickerSection } from '@/components/sections'
import { serverClient } from '@/lib/trpc/server'
import { getI18n, getCurrentLocale } from '@/locales/server'

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()
  const helloWord = await serverClient.players.online()

  return (
    <>
      <NewstickerSection />
      <div>
        <span>Current Locale: {locale}</span>
        <p>{t('quixer.box.login.login')}</p>
        <span
          style={{
            color: 'white',
          }}
        >
          {helloWord.online}
        </span>
      </div>
    </>
  )
}
