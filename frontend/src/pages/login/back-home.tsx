import { Arrow90degLeft } from 'react-bootstrap-icons'
import { useTranslation } from 'common/hooks'
import { Label } from 'components'
import { HOME_ROUTE } from 'modules'
import NextLink from 'next/link'
import { Stack, Tooltip, Link } from '@chakra-ui/react'

export const BackHome: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Tooltip
      hasArrow
      placement="end"
      aria-label="A tooltip"
      label={<Label text={t.backHome} />}
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
            boxShadow: `10px 10px 60px #ccc,
                     -10px -10px 60px #ffffff`,
            transform: 'rotate(-360deg)'
          },
          alignSelf: 'flex-start',
          borderRadius: '50%',
          cursor: 'pointer',
          mb: '20px',

          p: 5,

          transition: 'all 0.25s ease-out'
        }}
      >
        <NextLink passHref href={HOME_ROUTE.path}>
          <Link>
            <Arrow90degLeft />
          </Link>
        </NextLink>
      </Stack>
    </Tooltip>
  )
}
