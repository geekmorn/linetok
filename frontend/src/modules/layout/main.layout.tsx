import { PropsWithChildren } from 'react'
import { Navigation } from 'modules'
import Head from 'next/head'
import { Center, Container } from '@chakra-ui/react'

const SEO = {
  title: 'Интернет-магазин Linetok, г. Рогачев.',
  description:
    'Интернет-магазин Linetok.by в г. Рогачев - онлайн площадка бытовой техники, электроники, товаров для дома и дачи. Следите за нашими акциями и промокодами. С нами выгодно!'
} as const

type MainLayoutProps = PropsWithChildren & {
  title?: string
  description?: string
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = SEO.title,
  description = SEO.description
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
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
  </>
)
