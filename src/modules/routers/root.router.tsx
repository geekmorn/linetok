import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from 'modules/layout'
import { HomePage, ProductsPage, UsersPage } from 'pages'
import { routes } from './routes'

export const RootRouter: React.FC = () => (
  <Suspense fallback={<span>loading...</span>}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.users} element={<UsersPage />} />
        <Route path={routes.products} element={<ProductsPage />} />
      </Route>
    </Routes>
  </Suspense>
)
