import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import Link from 'next/link'
import { Button, Stack } from '@chakra-ui/react'

export const routes = [
  {
    name: '',
    path: '/'
  },
  {
    name: t('products.title'),
    path: '/products'
  },
  {
    name: t('contact.title'),
    path: '/contact'
  },
  {
    name: t('users.adminTitle'),
    path: '/admin/users'
  },
  {
    name: t('products.adminTitle'),
    path: '/admin/products'
  }
] as const

export const HOME_ROUTE = routes[0]

export const Navigation: React.FC = () => {
  const { t } = useTranslation()

  return (
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
        <Button>{t('enter')}</Button>
      </Link>
    </Stack>
  )
}
