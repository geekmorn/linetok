import Link from 'next/link'
import { Button, Stack } from '@chakra-ui/react'

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

export const HOME_ROUTE = routes[0]

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
    <Stack
      direction="row"
      sx={{
        gap: '50px',
        width: '100%',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      {routes.map((route) => (
        <Link key={`${route.path} <Link />`} href={route.path}>
          {route.name}
        </Link>
      ))}
      <Link href="/login">
        <Button>Войти</Button>
      </Link>
    </Stack>
  </Stack>
)
