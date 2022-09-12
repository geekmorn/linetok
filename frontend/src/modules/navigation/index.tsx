import Link from 'next/link'
import { Stack } from '@chakra-ui/react'

export const routes = [
  {
    path: '/',
    name: ''
  },
  {
    path: '/products',
    name: 'Продукты'
  },
  {
    path: '/contact',
    name: 'Связь'
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
  <Stack
    direction="row"
    as="nav"
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '50px'
    }}
  >
    <Stack direction="row" sx={{ gap: '50px', width: '100%', margin: 0 }}>
      {routes.map((route) => (
        <Link key={`${route.path} <Link />`} href={route.path}>
          {route.name}
        </Link>
      ))}
    </Stack>
    <Link href="/login">Логин</Link>
  </Stack>
)
