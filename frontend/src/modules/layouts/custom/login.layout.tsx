import { PropsWithChildren } from 'react'
import { BaseLayout } from '../base.layout'

type LoginLayoutProps = PropsWithChildren

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => (
  <BaseLayout>{children}</BaseLayout>
)
