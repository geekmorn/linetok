import { User } from 'modules'
import { Search } from './components'
import { useGetUsersQuery } from './hooks'

export const Users: React.FC = () => {
  const { data, isLoading } = useGetUsersQuery()

  const isEmpty = !data || data.length === 0

  return (
    <>
      <>
        <Search />
      </>
      {isLoading ? (
        <div>LOADING USERS.......</div>
      ) : isEmpty ? (
        <div>No users found.</div>
      ) : (
        data?.map((user) => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
            isActive={user.isActive}
          />
        ))
      )}
    </>
  )
}
