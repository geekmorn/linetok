import { queryClient } from 'common/client'
import { Products, Users } from 'modules'
import { MainLayout } from 'modules/layout'
import { Search } from 'modules/users/components/'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <MainLayout>
      <Search />
      <Users />
      <Products />
    </MainLayout>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
