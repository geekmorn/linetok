import { HomePage, ProductsPage, UsersPage } from 'pages'

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <HomePage />
  },
  {
    path: '/users',
    name: 'Users',
    element: <UsersPage />
  },
  {
    path: '/products',
    name: 'Products',
    element: <ProductsPage />
  }
] as const
