import { Sidebar } from './components'
import { useState, useEffect } from 'react'
import { PersonCircle } from 'react-bootstrap-icons'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Button,
  Heading,
  IconButton,
  Select,
  Stack,
  useColorMode,
  Text
} from '@chakra-ui/react'

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
  const { t } = useTranslation()
  const router = useRouter()
  const { toggleColorMode, colorMode } = useColorMode()

  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
        background: 'white',
        borderBottom: '1px solid black',
        gap: '50px',
        justifyContent: 'space-between',
        transition: '0.2s ease-out all',
        padding: scrollPosition > 1 ? '0 2.1rem' : '2rem 2.1rem',
        position: 'sticky',
        zIndex: '10',
        top: 0,
        width: '100%'
      }}
    >
      <Stack
        direction="row"
        gap={5}
        sx={{
          placeItems: 'center'
        }}
      >
        <Sidebar />
        <Heading>
          <Link href="/">{t.Linetok}</Link>
        </Heading>
      </Stack>
      <Stack
        direction="row"
        gap={3}
        sx={{
          placeItems: 'center'
        }}
      >
        <Select
          onChange={changeLanguage}
          value={router.locale}
          borderColor="transparent"
          sx={{
            border: 'none'
          }}
        >
          <option value="en-US">🇺🇸</option>
          <option value="by-BY">❤️</option>
        </Select>
        <Stack
          direction="row"
          sx={{
            color: 'black'
          }}
        >
          <IconButton
            background={colorMode === 'dark' ? 'black' : 'white'}
            border={
              colorMode === 'dark' ? '2px solid black' : '2px solid black'
            }
            aria-label="Toggle theme"
            rounded="full"
            size="xs"
            onClick={toggleColorMode}
          />
          <Text>{colorMode === 'dark' ? 'Dark' : 'Bright'}</Text>
        </Stack>
        <Link href="/login">
          <Button variant="link">
            <PersonCircle fontSize="1.5rem" color="black" />
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
}
