import { PropsWithChildren } from 'react'
import { Stack } from '@chakra-ui/react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren

export const Card: FC<CardProps> = ({ children }) => (
  <Stack
    w="400px"
    minH="60vh"
    _hover={{
      boxShadow: 'rgba(107, 66, 66, 0.3) -4px 9px 25px -6px;'
    }}
    sx={{
      '@media (max-width: 860px)': {
        width: '100%'
      },
      borderRadius: '1rem',
      boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-eve',
      minWidth: '300px',
      padding: '2rem',
      transition: 'all .5s ease-out'
    }}
  >
    {children}
  </Stack>
)
