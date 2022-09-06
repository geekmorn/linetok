import { queryClient } from 'common/clients'
import { usePageLoading } from 'common/hooks'
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
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Linetok
