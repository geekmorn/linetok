import { PropsWithChildren } from 'react'
import { SEO } from 'common/constants'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'

type BaseLayoutProps = PropsWithChildren & {
  title?: string
  description?: string
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
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
    <Container maxW={1280} minH="100vh" as="section">
      {children}
    </Container>
  </>
)
