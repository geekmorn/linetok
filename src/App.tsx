import { queryClient } from 'common/client'
import { Users } from 'modules'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Users />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
