import { Link } from 'react-router-dom'
import { routes } from 'modules/routers/routes'
import { Center } from '@chakra-ui/react'

export const Navigation: React.FC = () => {
  return (
    <Center sx={{ gap: '30px', padding: '30px' }}>
      {routes.map((route) => (
        <Link key={route.path} to={route.path}>
          {route.name}
        </Link>
      ))}
    </Center>
  )
}
