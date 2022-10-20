import { Cart, InfoCircle, ListColumns } from 'react-bootstrap-icons'
import { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Center,
  Heading,
  Highlight,
  Icon,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'

const AdminPage: NextPage = () => (
  <Stack
    sx={{
      placeItems: 'center',
      pt: '5% '
    }}
  >
    <Heading>Welcome, Makaroni.</Heading>
    <Text sx={{ pb: 10 }}>
      <Highlight
        query="SuperAdmin"
        styles={{ background: 'orange', borderRadius: '1rem', p: 1.5 }}
      >
        Your status is SuperAdmin, that&apos;s why you can see this page.
      </Highlight>
    </Text>
    <Stack
      sx={{
        background: 'black',
        borderRadius: '1rem',
        color: 'white',
        gap: '15px',
        p: '5rem 15rem'
      }}
    >
      <NextLink passHref href="/admin/help">
        <Link
          as={Center}
          gap={3}
          sx={{
            border: '2px solid white',
            borderRadius: '1rem',
            p: '1rem'
          }}
        >
          <Icon as={InfoCircle} fontSize="1rem" />
          <Text>Help</Text>
        </Link>
      </NextLink>
      <NextLink passHref href="/admin/users">
        <Link
          as={Center}
          gap={3}
          sx={{
            border: '2px solid white',
            borderRadius: '1rem',
            p: '1rem'
          }}
        >
          <Icon as={ListColumns} fontSize="1rem" />
          <Text>Manage users</Text>
        </Link>
      </NextLink>
      <NextLink passHref href="/admin/products">
        <Link
          as={Center}
          gap={3}
          sx={{
            border: '2px solid white',
            borderRadius: '1rem',
            p: '1rem'
          }}
        >
          <Icon as={Cart} fontSize="1rem" />
          <Text>Explore products</Text>
        </Link>
      </NextLink>
    </Stack>
  </Stack>
)

export default AdminPage
