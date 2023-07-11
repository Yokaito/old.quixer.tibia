import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import '@quixer/ui/dist/esm/index.css'

export default function Nextra({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />
}
