import { Arrow90degLeft } from 'react-bootstrap-icons'
import { Label } from 'components'
import { HOME_ROUTE } from 'modules/navigation'
import Link from 'next/link'
import { Stack, Tooltip } from '@chakra-ui/react'

export const BackHome: React.FC = () => (
  <Tooltip
    hasArrow
    placement="end"
    aria-label="A tooltip"
    label={<Label text="Вернуться на главную" />}
    sx={{
      ml: 3,
      p: 2
    }}
  >
    <Stack
      sx={{
        cursor: 'pointer',
        alignSelf: 'flex-start',
        mb: '20px',
        transition: 'all 0.3s ease-out',
        p: 5,
        borderRadius: '50%',

        '&:hover': {
          transform: 'rotate(-360deg)',
          boxShadow: `20px 20px 60px #bebebe,
                     -20px -20px 60px #ffffff`
        },
        '&:active': {
          transform: 'translateY(5px)'
        }
      }}
    >
      <Link href={HOME_ROUTE.path}>
        <Arrow90degLeft />
      </Link>
    </Stack>
  </Tooltip>
)
