import { FC } from 'react'
import { Fingerprint } from 'react-bootstrap-icons'
import { useTranslation } from 'common/hooks'
import { Label } from 'components'
import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'

type ButtonFingerprintProps = ButtonProps & {
  isVisible?: boolean
}

export const ButtonFingerprint: FC<ButtonFingerprintProps> = ({
  onClick,
  isVisible
}) => {
  const { t } = useTranslation()

  return isVisible ? (
    <Tooltip
      hasArrow
      placement="right"
      aria-label="A tooltip"
      label={<Label text={t.auth.biometry.enter} />}
      sx={{
        mt: 3,
        p: 3
      }}
    >
      <Button
        onClick={onClick}
        variant="outline"
        sx={{
          h: '50px',
          mt: '0 !important'
        }}
      >
        <Fingerprint width={30} height={30} />
      </Button>
    </Tooltip>
  ) : (
    <></>
  )
}
