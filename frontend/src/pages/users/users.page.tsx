import { Users } from 'modules'
import { Center } from '@chakra-ui/react'

export const UsersPage: React.FC = () => {
  return (
    <Center sx={{ flexDirection: 'column' }}>
      <Users />
    </Center>
  )
}
