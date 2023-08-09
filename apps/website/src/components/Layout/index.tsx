import { Header, Navigation, Sidebar } from '@/components/common'
import styles from './layout.module.scss'
import { InfoBar } from '../sections/InfoBar'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={`${styles.qxLayout} layout__content`}>
        <Navigation />
        <Sidebar />
        <main data-qx-main>
          <InfoBar />
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
