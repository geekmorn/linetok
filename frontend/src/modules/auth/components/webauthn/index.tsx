import useEvent from 'react-use-event-hook'
import {
  SUCCESSFULLY_AUTHORIZED,
  WARNING_SOMETHING_WENT_WRONG
} from 'common/i18n'
import { ButtonFingerprint } from 'components'
import { useBiometrics } from 'modules/auth'
import { useToast } from '@chakra-ui/react'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize, isBrowserSupported } = useBiometrics()

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

  return <ButtonFingerprint onClick={onClick} isVisible={isBrowserSupported} />
}
