import { Outlet } from 'react-router-dom'
import { Navigation } from 'modules'
import { Container } from '@chakra-ui/react'

export const MainLayout: React.FC = () => (
  <Container maxWidth={1280}>
    <Navigation />
    <Outlet />
  </Container>
)
