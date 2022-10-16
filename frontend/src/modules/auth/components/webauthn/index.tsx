import { useLayoutEffect } from 'react'
import useEvent from 'react-use-event-hook'
import { ButtonFingerprint } from 'components'
import { useBiometrics } from 'modules/auth'
import { useToast } from '@chakra-ui/react'
import { browserSupportsWebAuthn } from '@simplewebauthn/browser'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize } = useBiometrics()

  let supports = false

  useLayoutEffect(() => {
    supports = browserSupportsWebAuthn()
  }, [])

  const onClick = useEvent(async () => {
    try {
      const verified = await authorize({ isRegistrationMode })
      if (!verified) {
        toast({
          description: 'Something went wrong. Try again.',
          status: 'warning'
        })
        return
      }
      toast({
        description: 'Successfully authorized using biometry.',
        status: 'success'
      })
    } catch ({ name, message }) {
      toast({
        description: `${message}`,
        status: 'error',
        title: `${name}`
      })
    }
  })

  return <ButtonFingerprint onClick={onClick} isVisible={supports} />
}
