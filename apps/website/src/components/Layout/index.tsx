import { Header, Navigation, Sidebar } from '@/components/common'
import styles from './layout.module.scss'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/Section/Header'

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
          <Section>
            <SectionHeader>Teste</SectionHeader>
          </Section>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
