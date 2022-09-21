import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import { Center, Text, Wrap, WrapItem, useToast } from '@chakra-ui/react'
import { User } from './components'

export const Users: React.FC<UsersProps> = ({ initialData: data }) => {
  const toast = useToast()
  const noDataReceived = !data || data.length === 0

  const openUser = (id: string, name: string) => {
    toast({
      title: 'User clicked',
      description: `User with id '${id}' and name '${name}' clicked`,
      status: 'info',
      isClosable: true
    })
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
        <WrapItem key={user.username}>
          <User
            //
            onClick={() => openUser(user.username, user.name)}
            {...user}
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
