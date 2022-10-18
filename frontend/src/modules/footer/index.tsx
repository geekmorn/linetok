import { useTranslation } from 'common/hooks'
import { routes } from 'modules/navigation'
import { Center, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack
      as="footer"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'space-evenly',
        minHeight: '40vh',
        p: '2rem',
        width: '100%'
      }}
    >
      <Stack
        direction="row"
        sx={{
          textTransform: 'uppercase'
        }}
      >
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            {route.name}
          </Link>
        ))}
      </Stack>
      <Heading as="h3" fontSize={64}>
        {t.Linetok}
      </Heading>
      <Stack direction="row" gap={5}>
        <Text>&copy; {new Date().getFullYear()} linetok.com</Text>
        <Link href="#" isExternal>
          Public Offering
        </Link>
      </Stack>
      <Stack>
        <Text fontSize="xs">
          Designed in 🇵🇱 <br />
          by 🇺🇦 and 🤍❤️🤍
        </Text>
      </Stack>
    </Stack>
  )
}
