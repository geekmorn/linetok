import { User } from 'modules'
import { useGetUsersQuery } from './hooks'

export const Users: React.FC = () => {
  const { data, isLoading } = useGetUsersQuery()

  const noUsersDataReceived = !data || data.length === 0

  const clickUser = (id: string, name: string) => {
    alert(`User with id '${id}' and name '${name}' clicked`)
  }

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center'
      }}
    >
      {isLoading ? (
        <div style={{ fontSize: '75px' }}>
          <h1>🫥 Loading..</h1>
        </div>
      ) : noUsersDataReceived ? (
        <div>No products found. Please, come later! 🤩</div>
      ) : (
        data?.map((user) => (
          <User
            onClick={() => clickUser(user.id, user.name)}
            key={user.id}
            {...user}
          />
        ))
      )}
    </div>
  )
}
