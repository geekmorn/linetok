import { Fingerprint } from 'react-bootstrap-icons'
import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { useBiometrics } from 'modules/auth'
import useEvent from 'react-use-event-hook'

type WebAuthnProps = {
  isRegistrationMode: boolean
}

export const WebAuthn: React.FC<WebAuthnProps> = ({ isRegistrationMode }) => {
  const toast = useToast()
  const { authorize } = useBiometrics()

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

  return (
    <Tooltip
      hasArrow
      label="Войти с помощью биометрических данных"
      aria-label="A tooltip"
      sx={{
        color: 'white'
      }}
    >
      <Button
        onClick={onClick}
        variant="outline"
        sx={{
          h: '50px',
          mt: '0!important'
        }}
      >
        <Fingerprint width={30} height={30} />
      </Button>
    </Tooltip>
  )
}
