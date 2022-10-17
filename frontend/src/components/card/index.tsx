import { PropsWithChildren } from 'react'
import { Stack } from '@chakra-ui/react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren

export const Card: React.FC<CardProps> = ({ children }) => (
  <Stack
    w="400px"
    minH="70vh"
    sx={{
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-eve',
      flexWrap: 'wrap',
      margin: '5px',
      minWidth: '300px',
      padding: '20px',
      transition: 'all .5s ease-out',
      boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;',

      '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.2) -4px 9px 25px -6px;'
      }
    }}
  >
    {children}
  </Stack>
)
