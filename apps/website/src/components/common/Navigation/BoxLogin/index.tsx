import { MenuBox } from '@/components/ui'
import Button from '@/components/ui/Button'
import styles from './box-login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import LogoTibiaArtWork from '@/assets/images/logo/tibia-logo-artwork-top.webp'

export const BoxLogin = () => {
  return (
    <div className={`${styles.qxBoxLogin}`} data-qx-box-login>
      <Link data-qx-logo-artwork href="/">
        <Image src={LogoTibiaArtWork} alt="logo tibia artwork" />
      </Link>
      <MenuBox>
        <Button>Login</Button>
        <Link
          data-qx-box-login-link
          href="/register"
          className="fondamentoTitle"
        >
          Create account
        </Link>
      </MenuBox>
    </div>
  )
}

export default BoxLogin
