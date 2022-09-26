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
        '&:active': {
          transform: 'translateY(5px)'
        },
        '&:hover': {
          boxShadow: `20px 20px 60px #bebebe,
                     -20px -20px 60px #ffffff`,
          transform: 'rotate(-360deg)'
        },
        alignSelf: 'flex-start',
        borderRadius: '50%',
        cursor: 'pointer',
        mb: '20px',

        p: 5,
        transition: 'all 0.3s ease-out'
      }}
    >
      <Link href={HOME_ROUTE.path}>
        <Arrow90degLeft />
      </Link>
    </Stack>
  </Tooltip>
)
