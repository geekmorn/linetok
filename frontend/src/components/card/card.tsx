import { PropsWithChildren } from 'react'
import { Stack } from '@chakra-ui/react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Stack
      sx={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: '10px',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '15px'
      }}
    >
      {children}
    </Stack>
  )
}
