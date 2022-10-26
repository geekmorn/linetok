import { BaseLayout } from '../base.layout'
import { FC, PropsWithChildren } from 'react'

type LoginLayoutProps = PropsWithChildren

export const LoginLayout: FC<LoginLayoutProps> = ({ children }) => (
  <BaseLayout>{children}</BaseLayout>
)
