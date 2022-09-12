import { useToggle } from 'common/hooks'
import { AuthForm } from 'modules'
import { NextPage } from 'next'
import { Center, Stack, Button, Text, Highlight } from '@chakra-ui/react'

const userHasNoAccount = {
  question: 'Ещё нет аккаунта?',
  tip: 'Зарегистрируйтесь'
} as const

const userAlreadyHasAccount = {
  question: 'Уже есть аккаунт?',
  tip: 'Войдите'
} as const

const LoginPage: NextPage = () => {
  const [isRegistrationMode, toggle] = useToggle(true)

  const question = isRegistrationMode
    ? userAlreadyHasAccount.question
    : userHasNoAccount.question

  const tip = isRegistrationMode
    ? userAlreadyHasAccount.tip
    : userHasNoAccount.tip

  return (
    <Center h="100vh">
      <Stack gap="80px" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <AuthForm isRegistrationMode={isRegistrationMode} />
        <Stack w="65%" sx={{ textAlign: 'center' }}>
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
        </Stack>
      </Stack>
    </Center>
  )
}

export default LoginPage
