import styles from './page.module.scss'
import { getStaticParams, getI18n } from '@/locales/server'

export const generateStaticParams = getStaticParams()

export default async function Home() {
  const t = await getI18n()

  return (
    <main className={styles.main}>
      <div>
        <span>Current Locale: {}</span>
        <p>{t('hello')}</p>
      </div>
    </main>
  )
}
