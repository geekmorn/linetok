import { PropsWithChildren } from 'react'

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      gap: '50px'
    }}
  >
    {children}
  </div>
)
