import { PropsWithChildren } from 'react'
import { Navigation } from 'modules'
import { BaseLayout } from 'modules/layouts'
import { Center, Container } from '@chakra-ui/react'

type MainLayoutProps = PropsWithChildren

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <BaseLayout>
    <header>
      <Navigation />
    </header>
    <Container maxW={1280} minH="100vh" as="section">
      {children}
    </Container>
    <footer>
      <Center
        sx={{
          height: '60px',
          backgroundColor: 'green'
        }}
      >
        <hr />
        <span>Footer will be here.</span>
      </Center>
    </footer>
  </BaseLayout>
)
