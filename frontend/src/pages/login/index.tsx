import { useToggle } from 'common/hooks'
import { AuthForm, routes } from 'modules'
import { NextPage } from 'next'
import {
  Center,
  Stack,
  Button,
  Text,
  Highlight,
  Box,
  Tooltip
} from '@chakra-ui/react'
import Link from 'next/link'
import { Arrow90degLeft } from 'react-bootstrap-icons'

const userHasNoAccount = {
  question: 'Ещё нет аккаунта?',
  tip: 'Зарегистрируйтесь'
} as const

const userAlreadyHasAccount = {
  question: 'Уже есть аккаунт?',
  tip: 'Войдите'
} as const

const LoginPage: NextPage = () => {
  const [isRegistrationMode, toggle] = useToggle(false)

  const question = isRegistrationMode
    ? userAlreadyHasAccount.question
    : userHasNoAccount.question

  const tip = isRegistrationMode
    ? userAlreadyHasAccount.tip
    : userHasNoAccount.tip

  return (
    <Center h="100vh" sx={{ justifyContent: 'space-evenly' }}>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip label="Вернуться домой">
          <Button sx={{ alignSelf: 'flex-start', mb: '20px' }}>
            <Link href={routes[0].path}>
              <Arrow90degLeft />
            </Link>
          </Button>
        </Tooltip>
        <AuthForm isRegistrationMode={isRegistrationMode} />
        <Box w="65%" sx={{ textAlign: 'center', mt: '80px !important' }}>
          <Text fontSize="xs" lineHeight="tall">
            <Highlight
              query={['есть', 'нет']}
              styles={{
                px: '2',
                py: '1',
                rounded: 'full',
                bg: isRegistrationMode ? 'green.100' : 'red.100'
              }}
            >
              {question}
            </Highlight>
          </Text>
          <Button onClick={toggle} variant="link">
            {tip}
          </Button>
        </Box>
      </Stack>
    </Center>
  )
}

export default LoginPage
