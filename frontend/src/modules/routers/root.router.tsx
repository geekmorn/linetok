import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from 'modules/layout'
import { routes } from './routes'

export const RootRouter: React.FC = () => (
  <Suspense fallback={<span>loading page...</span>}>
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  </Suspense>
)
