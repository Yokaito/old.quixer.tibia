/* eslint-disable @next/next/no-img-element */
import DefaultLogo from '@/assets/images/logo/default_logo.gif'

type Props = {
  logo?: string
  name: string
}

export const LogoGuild = ({ logo, name }: Props) => {
  return (
    <img
      src={logo && logo.length !== 0 ? logo : DefaultLogo.src}
      width={64}
      height={64}
      alt={name}
    />
  )
}

export default LogoGuild
