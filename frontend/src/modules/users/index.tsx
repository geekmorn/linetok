import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { User } from './components'

export const Users: React.FC<UsersProps> = ({ data, isLoading }) => {
  const noDataReceived = !data || data.length === 0

  const openUser = (id: string, name: string) => {
    alert(`User with id '${id}' and name '${name}' clicked`)
  }

  return (
    <>
      {isLoading ? (
        <Stack style={{ fontSize: '75px' }}>
          <Spinner />
        </Stack>
      ) : noDataReceived ? (
        <Text>No users found :(</Text>
      ) : (
        <Wrap>
          {data.map((user: UserType) => (
            <WrapItem key={user.id}>
              <User onClick={() => openUser(user.id, user.name)} {...user} />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  )
}
