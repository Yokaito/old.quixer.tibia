import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'
import styles from './box-login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import LogoTibiaArtWork from '@/assets/images/logo/tibia-logo-artwork-top.webp'
import { getI18n } from '@/locales/server'

export const BoxLogin = async () => {
  const t = await getI18n()

  return (
    <div className={`${styles.qxBoxLogin}`} data-qx-box-login>
      <Link data-qx-logo-artwork href="/">
        <Image src={LogoTibiaArtWork} alt="logo tibia artwork" />
      </Link>
      <MenuBox showChain>
        <Button>{t('quixer.box.login.login')}</Button>
        <Link
          data-qx-box-login-link
          href="/register"
          className="fondamentoTitle"
        >
          {t('quixer.box.login.register')}
        </Link>
      </MenuBox>
    </div>
  )
}

export default BoxLogin
