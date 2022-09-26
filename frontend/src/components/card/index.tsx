import { PropsWithChildren } from 'react'
import { Stack } from '@chakra-ui/react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Stack
      maxW="350px"
      sx={{
        border: '1px solid #c1c1c1',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: '5px',
        minWidth: '300px',
        padding: '5px'
      }}
    >
      {children}
    </Stack>
  )
}
