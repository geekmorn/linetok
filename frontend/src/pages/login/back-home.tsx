import { Tooltip, Button } from '@chakra-ui/react'
import { Label } from 'components'
import { HOME_ROUTE } from 'modules/navigation'
import Link from 'next/link'
import { Arrow90degLeft } from 'react-bootstrap-icons'

export const BackHome: React.FC = () => (
  <Tooltip
    hasArrow
    placement="end"
    aria-label="A tooltip"
    label={<Label text="Вернуться на главную" />}
    sx={{
      p: 2
    }}
  >
    <Button
      sx={{
        alignSelf: 'flex-start',
        mb: '20px'
      }}
    >
      <Link href={HOME_ROUTE.path}>
        <Arrow90degLeft />
      </Link>
    </Button>
  </Tooltip>
)
