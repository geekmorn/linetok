import { useToggle } from 'common/hooks'
import { AuthorizationForm, RegistrationForm } from 'modules'
import { NextPage } from 'next'
import { Button, Center, Stack, Text } from '@chakra-ui/react'

const noAccount = {
  question: 'У Вас еще нет аккаунта?',
  tip: 'Зарегистрируйтесь'
} as const

const haveAccount = {
  question: 'У Вас уже есть аккаунт?',
  tip: 'Войдите'
} as const

const LoginPage: NextPage = () => {
  const [isRegistrationMode, toggle] = useToggle(false)

  return (
    <Center h="100vh">
      <Stack gap={10}>
        {isRegistrationMode ? <RegistrationForm /> : <AuthorizationForm />}
        <Stack sx={{ textAlign: 'center' }}>
          <Text>
            {isRegistrationMode ? haveAccount.question : noAccount.question}
          </Text>
          <Button onClick={toggle}>
            {isRegistrationMode ? haveAccount.tip : noAccount.tip}
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}

export default LoginPage
