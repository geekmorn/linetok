import { useEffect } from 'react'
import useEvent from 'react-use-event-hook'
import { ButtonFingerprint } from 'components'
import { useBiometrics } from 'modules/auth'
import { useToast, UseToastOptions } from '@chakra-ui/react'
import { browserSupportsWebAuthn } from '@simplewebauthn/browser'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

const WARNING_SOMETHING_WENT_WRONG: UseToastOptions = {
  description: 'Something went wrong. Try again.',
  status: 'warning'
}

const SUCCESSFULLY_AUTHORIZED: UseToastOptions = {
  description: 'Successfully authorized using biometry.',
  status: 'success'
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize } = useBiometrics()

  const onClick = useEvent(async () => {
    try {
      const verified = await authorize({ isRegistrationMode })
      if (!verified) {
        toast(WARNING_SOMETHING_WENT_WRONG)
        return
      }
      toast(SUCCESSFULLY_AUTHORIZED)
    } catch ({ name, message }) {
      toast({
        description: `${message}`,
        status: 'error',
        title: `${name}`
      })
    }
  })

  return <ButtonFingerprint onClick={onClick} isVisible={true} />
}
