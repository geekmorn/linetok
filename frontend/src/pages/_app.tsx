import { queryClient } from 'common/clients'
import { LoginLayout, MainLayout } from 'modules'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Linetok = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {pathname === '/login' ? (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        ) : (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Linetok
