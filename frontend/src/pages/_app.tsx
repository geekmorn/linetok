import { queryClient } from 'common/clients'
import { usePageLoading } from 'common/hooks'
import { AnimatePresence } from 'framer-motion'
import { LoginLayout, MainLayout } from 'modules'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider, Progress } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Linetok = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const loading = usePageLoading()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AnimatePresence exitBeforeEnter initial={false}>
          {pathname === '/login' ? (
            <>
              {loading ? (
                <>
                  <Progress size="xs" isIndeterminate />
                </>
              ) : (
                <LoginLayout>
                  <Component {...pageProps} />
                </LoginLayout>
              )}
            </>
          ) : (
            <MainLayout>
              {loading ? (
                <>
                  <Progress size="xs" isIndeterminate />
                </>
              ) : (
                <Component {...pageProps} />
              )}
            </MainLayout>
          )}
        </AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Linetok
