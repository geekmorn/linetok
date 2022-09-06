import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { User } from './components'

export const Users: React.FC<UsersProps> = ({ data, isLoading }) => {
  const noDataReceived = !data || data.length === 0

  const openUser = (id: string, name: string) => {
    alert(`User with id '${id}' and name '${name}' clicked`)
  }

  if (isLoading) {
    return (
      <Stack style={{ fontSize: '75px' }}>
        <Spinner />
      </Stack>
    )
  }

  if (noDataReceived) {
    return <Text>No users found :(</Text>
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
