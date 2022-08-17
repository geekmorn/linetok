import { queryClient } from 'common/clients'
import { LoginLayout, MainLayout } from 'modules'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Linetok = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
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
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default Linetok
