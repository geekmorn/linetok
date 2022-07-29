import { PropsWithChildren } from 'react'
import { Center } from 'components'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Center
    sx={{
      gap: '50px',
      flexDirection: 'column'
    }}
  >
    {children}
  </Center>
)
