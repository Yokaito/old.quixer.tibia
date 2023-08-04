import styles from './page.module.scss'
import { getI18n, getCurrentLocale } from '@/locales/server'

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()

  return (
    <main className={styles.main}>
      <div>
        <span>Current Locale: {locale}</span>
        <p>{t('hello')}</p>
      </div>
    </main>
  )
}
