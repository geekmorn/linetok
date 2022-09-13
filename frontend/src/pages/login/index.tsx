import { useToggle } from 'common/hooks'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { AuthForm } from 'modules'
import { NextPage } from 'next'
import { Center, Stack } from '@chakra-ui/react'
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
  const isPresent = useIsPresent()
  const [isRegistrationMode, toggle] = useToggle(false)

  const question = isRegistrationMode
    ? userAlreadyHasAccount.question
    : userHasNoAccount.question

  const tip = isRegistrationMode
    ? userAlreadyHasAccount.tip
    : userHasNoAccount.tip

  return (
    <AnimatePresence exitBeforeEnter>
      {isPresent && (
        <motion.div
          key="Authentication"
          initial={{ opacity: 0, y: -500 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, y: -500 }}
        >
          <Center h="100vh" sx={{ justifyContent: 'space-evenly' }}>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginPage
