import { Fingerprint } from 'react-bootstrap-icons'
import { Button, useToast } from '@chakra-ui/react'
import { useBiometrics } from 'modules/auth'
import useEvent from 'react-use-event-hook'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize } = useBiometrics({ isRegistrationMode })

  const onClick = useEvent(async () => {
    try {
      const verified = await authorize()
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
    } catch (error: any) {
      toast({
        title: `${error.name}`,
        description: `${error.message}`,
        status: 'error'
      })
    }
  })

  return (
    <Button
      onClick={onClick}
      variant="solid"
      sx={{
        h: '50px',
        mt: '0!important'
      }}
    >
      <Fingerprint width={30} height={30} />
    </Button>
  )
}
