import { useCallback } from 'react'
import { Fingerprint } from 'react-bootstrap-icons'
import { Button, useToast } from '@chakra-ui/react'

const promptBiometry = () => {
  console.log('Not implemented')

  return
}

export const WebAuthn = () => {
  const toast = useToast()

  const onClick = useCallback(() => {
    promptBiometry()
    toast({
      title: 'Coming soon!'
    })
  }, [toast])

  return (
    <Button
      onClick={onClick}
      variant="outline"
      sx={{
        h: '50px',
        mt: '0!important'
      }}
    >
      <Fingerprint width={32} height={32} />
    </Button>
  )
}
