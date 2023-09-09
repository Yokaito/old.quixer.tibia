import { Header, Navigation, Sidebar } from '@/components/common'
import { InfoSection } from '../sections'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={`layout-content page-layout`}>
        <Navigation />
        <Sidebar />
        <main className="layout-main">
          <InfoSection />
          {children}
        </main>
      </div>
      <footer
        className="min-h-[60px]"
        style={{
          gridArea: 'footer',
        }}
      />
    </>
  )
}

export default Layout
