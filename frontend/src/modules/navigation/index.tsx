import Link from 'next/link'
import { Center } from '@chakra-ui/react'

export const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/admin/users',
    name: 'Users'
  },
  {
    path: '/admin/products',
    name: 'Products'
  }
] as const

export const Navigation: React.FC = () => {
  return (
    <Center sx={{ gap: '30px', padding: '30px' }}>
      {routes.map((route) => (
        <Link key={route.path} href={route.path}>
          {route.name}
        </Link>
      ))}
    </Center>
  )
}
