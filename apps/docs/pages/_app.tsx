import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'
import '@quixer/ui/dist/esm/quixer-ui.css'

export default function Nextra({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />
}
