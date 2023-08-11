import { MenuBox } from '@/components/ui'
import styles from './box-login.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import LogoTibiaArtWork from '@/assets/images/logo/tibia-logo-artwork-top.webp'
import ButtonSignIn from '@/components/ui/Button/ButtonSignIn'
import { ButtonSignOut } from '@/components/ui/Button/ButtonSignOut'

export const BoxLogin = async () => {
  return (
    <div className={`${styles.qxBoxLogin}`} data-qx-box-login>
      <Link data-qx-logo-artwork href="/">
        <Image src={LogoTibiaArtWork} alt="logo tibia artwork" />
      </Link>
      <MenuBox showChain>
        <ButtonSignIn />
        <ButtonSignOut />
      </MenuBox>
    </div>
  )
}

export default BoxLogin
