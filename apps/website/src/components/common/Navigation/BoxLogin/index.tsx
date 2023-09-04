import { MenuBox } from '@/components/ui'

import Link from 'next/link'
import Image from 'next/image'
import LogoTibiaArtWork from '@/assets/images/logo/tibia-logo-artwork-top.webp'
import ButtonSignIn from '@/components/ui/Button/ButtonSignIn'
import { ButtonSignOut } from '@/components/ui/Button/ButtonSignOut'

export const BoxLogin = async () => {
  return (
    <div>
      <Link
        href="/"
        className="absolute top-[-155px] right-[-2px] w-full flex items-center"
      >
        <Image src={LogoTibiaArtWork} alt="logo tibia artwork" priority />
      </Link>
      <MenuBox showChain>
        <ButtonSignIn />
        <ButtonSignOut />
      </MenuBox>
    </div>
  )
}

export default BoxLogin
