import useEvent from 'react-use-event-hook'
import { ButtonFingerprint } from 'components'
import { useBiometrics, useBrowserSupportsWebAuthn } from 'modules/auth'
import { useToast } from '@chakra-ui/react'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize } = useBiometrics()
  const supports = useBrowserSupportsWebAuthn()

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
        title: `${name}`,
        description: `${message}`,
        status: 'error'
      })
    }
  })

  return <ButtonFingerprint onClick={onClick} isVisible={supports} />
}
