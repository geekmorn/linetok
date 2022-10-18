import { UserPanel, Menu } from './components'
import { useScrollPosition } from 'common/hooks'
import { Stack } from '@chakra-ui/react'

export const Navigation: React.FC = () => {
  const scrollPosition = useScrollPosition()

  return (
    <Stack
      direction="row"
      as="nav"
      sx={{
        alignItems: 'center',
        background: 'white',
        borderBottom: '1px solid black',
        gap: '50px',
        justifyContent: 'space-between',
        padding: scrollPosition > 1 ? '0 2.1rem' : '2rem 2.1rem',
        position: 'sticky',
        top: 0,
        transition: '0.2s ease-out all',
        width: '100%',
        zIndex: '10'
      }}
    >
      <Menu />
      <UserPanel />
    </Stack>
  )
}
