import { PropsWithChildren } from 'react'
import { SEO } from 'common/constants'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { Stack } from '@chakra-ui/react'

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
    <>
      <Stack w="100%" minH="100vh">
        <motion.div
          key="layoutChangeAnimation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {children}
        </motion.div>
      </Stack>
    </>
  </>
)
