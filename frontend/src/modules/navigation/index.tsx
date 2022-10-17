import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Select, Stack } from '@chakra-ui/react'

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

export const HOME_ROUTE = routes[0]

export const Navigation: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const changeLanguage = useEvent((event: any) => {
    const locale = event.target.value
    router.push(router.route, router.asPath, { locale })
  })

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
      <Stack>
        <Select onChange={changeLanguage} value={router.locale}>
          <option value="en-US">🇺🇸 English</option>
          <option value="by-BY">Беларуская</option>
        </Select>
      </Stack>
      <Link href="/login">
        <Button>{t.enter}</Button>
      </Link>
    </Stack>
  )
}
