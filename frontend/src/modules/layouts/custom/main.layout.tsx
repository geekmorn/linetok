import { PropsWithChildren } from 'react'
import { BaseLayout } from 'modules/layouts'

type MainLayoutProps = PropsWithChildren

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <BaseLayout>{children}</BaseLayout>
)
