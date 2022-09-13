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

  const onAuthorize = async () => {
    try {
      const verified = await authorize({ isRegistrationMode })
      if (verified) {
        toast({
          description: 'Successfully authorized using biometry.',
          status: 'success'
        })
        return
      }
      toast({
        description: 'Something went wrong. Try again.',
        status: 'warning'
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: `${error.name}`,
        description: `${error.message}`,
        status: 'error'
      })
    }
  }

  const onClick = useEvent(() => onAuthorize())

  return <ButtonFingerprint onClick={onClick} isVisible={supports} />
}
