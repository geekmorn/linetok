import { createStandaloneToast } from '@chakra-ui/toast'
import { QueryCache, QueryClient } from '@tanstack/react-query'

const { toast } = createStandaloneToast()

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        console.error(error)
        toast({
          title: 'An error occurred.',
          description: `${error}`,
          status: 'error',
          isClosable: true
        })
      }
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000
    }
  }
})
