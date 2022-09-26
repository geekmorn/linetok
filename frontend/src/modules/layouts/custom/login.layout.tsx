import { BaseLayout } from '../base.layout'
import { PropsWithChildren } from 'react'

type LoginLayoutProps = PropsWithChildren

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => (
  <BaseLayout>{children}</BaseLayout>
)
