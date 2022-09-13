import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import { Center, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { User } from './components'

export const Users: React.FC<UsersProps> = ({ initialData: data }) => {
  const noDataReceived = !data || data.length === 0

  const openUser = (id: string, name: string) => {
    alert(`User with id '${id}' and name '${name}' clicked`)
  }

  if (noDataReceived) {
    return (
      <Center>
        <Text>No users found :(</Text>
      </Center>
    )
  }

  return (
    <Wrap>
      {data?.map((user: UserType) => (
        <WrapItem key={`${user.username} <User />`}>
          <User onClick={() => openUser(user.username, user.name)} {...user} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
