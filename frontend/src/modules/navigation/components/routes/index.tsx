import { FC } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const routes = [
  {
    name: 'Home',
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
    name: 'Admin',
    path: '/admin'
  }
] as const

export type RoutesType = typeof routes

export const HOME_ROUTE = routes[0]
export const PRODUCTS_ROUTE = routes[1]
export const CONTACT_ROUTE = routes[2]
export const ADMIN_ROUTE = routes[3]

type RoutesProps = { onClick?: () => void }

export const Routes: FC<RoutesProps> = ({ onClick }) => (
  <>
    {routes.map((route) => (
      <NextLink passHref key={route.path} href={route.path}>
        <Link onClick={onClick}>{route.name}</Link>
      </NextLink>
    ))}
  </>
)
