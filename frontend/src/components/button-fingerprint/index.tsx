import React from 'react'
import { Fingerprint } from 'react-bootstrap-icons'
import { Label } from 'components'
import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'

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
      label={<Label text="Войти с помощью биометрических данных" />}
      sx={{
        mt: 3,
        p: 2
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
