import Link from 'next/link'
import { Center } from '@chakra-ui/react'

export const routes = [
  {
    path: '/',
    name: ''
  },
  {
    path: '/products',
    name: 'Products'
  },
  {
    path: '/contact',
    name: 'Contact'
  }
  // {
  //   path: '/admin/users',
  //   name: 'Users'
  // },
  // {
  //   path: '/admin/products',
  //   name: 'Products'
  // }
] as const

export const Navigation: React.FC = () => (
  <Center
    as="nav"
    sx={{ gap: '30px', padding: '30px', width: '100%', margin: 0 }}
  >
    {routes.map((route) => (
      <Link key={`${route.path} <Link />`} href={route.path}>
        {route.name}
      </Link>
    ))}
  </Center>
)
