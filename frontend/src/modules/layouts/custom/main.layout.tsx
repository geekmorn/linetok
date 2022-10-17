import { PropsWithChildren } from 'react'
import { Footer, Navigation } from 'modules'
import { BaseLayout } from 'modules/layouts'
import { Stack } from '@chakra-ui/react'

type MainLayoutProps = PropsWithChildren

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <BaseLayout>
    <Navigation />
    <header></header>
    <Stack
      sx={{
        minHeight: '85vh'
      }}
    >
      {children}
    </Stack>
    <Footer />
  </BaseLayout>
)
