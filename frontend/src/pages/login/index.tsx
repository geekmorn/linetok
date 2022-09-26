import { Center, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useToggle } from 'common/hooks'
import { AuthForm } from 'modules'
import { BackHome } from './back-home'
import { Question } from './question'

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
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <BackHome />
        <AuthForm isRegistrationMode={isRegistrationMode} />
        <Question
          isRegistrationMode={isRegistrationMode}
          question={question}
          toggle={toggle}
          tip={tip}
        />
      </Stack>
    </Center>
  )
}

export default LoginPage
