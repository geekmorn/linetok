import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import { Fingerprint } from 'react-bootstrap-icons'

type ButtonFingerprintProps = ButtonProps & {
  isVisible?: boolean
}

export const ButtonFingerprint: React.FC<ButtonFingerprintProps> = ({
  onClick,
  isVisible
}) =>
  isVisible ? (
    <Tooltip
      hasArrow
      placement="bottom-end"
      aria-label="A tooltip"
      label="Войти с помощью биометрических данных"
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
  ) : (
    <></>
  )
