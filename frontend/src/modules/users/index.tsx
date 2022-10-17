import { User } from './components'
import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import { Center, Text, Wrap, WrapItem, useToast } from '@chakra-ui/react'

export const Users: React.FC<UsersProps> = ({ initialData: data }) => {
  const toast = useToast()
  const noDataReceived = !data || data.length === 0

  const openUser = (id: string, name: string) => {
    toast({
      description: `User with id '${id}' and name '${name}' clicked`,
      isClosable: true,
      status: 'info',
      title: 'User clicked'
    })
  }

  if (noDataReceived) {
    return (
      <Center>
        <Text>Карыстальнікі не знойдзены.</Text>
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
