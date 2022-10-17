import Link from 'next/link'
import { Button, Stack } from '@chakra-ui/react'

export const routes = [
  {
    name: '',
    path: '/'
  },
  {
    name: 'Прадукты',
    path: '/products'
  },
  {
    name: 'Сувязь',
    path: '/contact'
  },
  {
    name: 'Карыстальнікі (Адміністратар)',
    path: '/admin/users'
  },
  {
    name: 'Прадукты (Адміністратар)',
    path: '/admin/products'
  }
] as const

export const HOME_ROUTE = routes[0]

export const Navigation: React.FC = () => (
  <Stack
    direction="row"
    as="nav"
    sx={{
      alignItems: 'center',
      gap: '50px',
      justifyContent: 'flex-end',
      margin: 0,
      padding: '50px',
      width: '100%'
    }}
  >
    {routes.map((route) => (
      <Link key={route.path} href={route.path}>
        {route.name}
      </Link>
    ))}
    <Link href="/login">
      <Button>Увайсці</Button>
    </Link>
  </Stack>
)
