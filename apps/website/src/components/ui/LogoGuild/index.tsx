/* eslint-disable @next/next/no-img-element */

type Props = {
  logo?: string
  name: string
}

export const LogoGuild = ({ logo, name }: Props) => {
  return (
    <img
      src={logo && logo.length !== 0 ? logo : '/guild/default_logo.gif'}
      width={64}
      height={64}
      alt={name}
    />
  )
}

export default LogoGuild
