import { PropsWithChildren } from 'react'
import { Container } from '@chakra-ui/react'
import { BaseLayout } from '../base.layout'

type LoginLayoutProps = PropsWithChildren

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => (
  <BaseLayout>
    <Container maxW={1280} minH="100vh" as="section">
      {children}
    </Container>
  </BaseLayout>
)
