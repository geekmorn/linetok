import { createStandaloneToast } from '@chakra-ui/react'
import { QueryCache, QueryClient } from '@tanstack/react-query'

const { toast } = createStandaloneToast()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        console.error(error)
        toast({
          description: `${error}`,
          isClosable: true,
          status: 'error',
          title: 'An error occurred.'
        })
      }
    }
  })
})
