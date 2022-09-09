import { useToggle } from 'common/hooks'
import { AuthForm } from 'modules'
import { NextPage } from 'next'
import { Center, Stack } from '@chakra-ui/react'

const userHasNoAccount = {
  question: 'У Вас еще нет аккаунта?',
  tip: 'Зарегистрируйтесь'
} as const

const userAlreadyHasAccount = {
  question: 'У Вас уже есть аккаунт?',
  tip: 'Войдите'
} as const

const LoginPage: NextPage = () => {
  const [isRegistrationMode, toggle] = useToggle(false)

  return (
    <Center h="100vh">
      <Stack gap={10}>
        <AuthForm isRegistrationMode={isRegistrationMode} />
      </Stack>
    </Center>
  )
}

export default LoginPage
