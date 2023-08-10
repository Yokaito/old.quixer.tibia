import Newsticker from '@/components/sections/newsticker'
import styles from './page.module.scss'
import { getI18n, getCurrentLocale } from '@/locales/server'

export default async function Home() {
  const t = await getI18n()
  const locale = getCurrentLocale()

  return (
    <>
      <Newsticker />
      <div className={styles.main}>
        <span>Current Locale: {locale}</span>
        <p>{t('quixer.box.login.login')}</p>
      </div>
    </>
  )
}
