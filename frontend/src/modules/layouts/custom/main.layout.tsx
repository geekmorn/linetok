import { PropsWithChildren } from 'react'
import { Footer, Navigation } from 'modules'
import { BaseLayout } from 'modules/layouts'

type MainLayoutProps = PropsWithChildren

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <BaseLayout>
    <Navigation />
    <header></header>
    <>{children}</>
    <footer>
      <Footer />
    </footer>
  </BaseLayout>
)
