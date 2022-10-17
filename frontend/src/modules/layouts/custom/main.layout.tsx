import { PropsWithChildren } from 'react'
import { Footer, Navigation } from 'modules'
import { BaseLayout } from 'modules/layouts'
import { Stack } from '@chakra-ui/react'

type MainLayoutProps = PropsWithChildren

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <BaseLayout>
    <header>
      <Navigation />
    </header>
    <Stack
      sx={{
        p: '0 2%',
        minHeight: '85vh',
        width: '100%'
      }}
    >
      {children}
    </Stack>
    <Footer />
  </BaseLayout>
)
