import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const routes = [
  {
    name: '',
    path: '/'
  },
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'Contact',
    path: '/contact'
  },
  {
    name: 'Users (Admin)',
    path: '/admin/users'
  },
  {
    name: 'Products (Admin)',
    path: '/admin/products'
  }
] as const

export type RoutesType = typeof routes

export const HOME_ROUTE = routes[0]
export const PRODUCTS_ROUTE = routes[1]
export const CONTACT_ROUTE = routes[2]
export const USERS_ADMIN_ROUTE = routes[3]
export const PRODUCTS_ADMIN_ROUTE = routes[4]

type RoutesProps = { onClick?: () => void }

export const Routes: React.FC<RoutesProps> = ({ onClick }) => (
  <>
    {routes.map((route) => (
      <NextLink passHref key={route.path} href={route.path}>
        <Link onClick={onClick}>{route.name}</Link>
      </NextLink>
    ))}
  </>
)
