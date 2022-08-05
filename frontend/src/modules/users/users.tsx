import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { User } from './components'
import { useGetUsersQuery } from './hooks'

export const Users: React.FC = () => {
  const { data, isLoading } = useGetUsersQuery()

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
          {data.map((user) => (
            <WrapItem key={user.id}>
              <User onClick={() => openUser(user.id, user.name)} {...user} />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  )
}
