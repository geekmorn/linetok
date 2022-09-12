import { useToggle } from 'common/hooks'
import { AuthForm } from 'modules'
import { NextPage } from 'next'
import { Center, Stack, Text, Button } from '@chakra-ui/react'

const userHasNoAccount = {
  question: 'У Вас еще нет аккаунта?',
  tip: 'Зарегистрируйтесь'
} as const

const userAlreadyHasAccount = {
  question: 'У Вас уже есть аккаунт?',
  tip: 'Войдите'
} as const

const LoginPage: NextPage = () => {
  const [isRegistrationMode, toggle] = useToggle(true)

  return (
    <Center h="100vh">
      <Stack gap="80px">
        <AuthForm isRegistrationMode={isRegistrationMode} />
        <Stack sx={{ textAlign: 'center' }}>
          <Text>
            {isRegistrationMode
              ? userAlreadyHasAccount.question
              : userHasNoAccount.question}
          </Text>
          <Button onClick={toggle}>
            {isRegistrationMode
              ? userAlreadyHasAccount.tip
              : userHasNoAccount.tip}
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}

export default LoginPage
