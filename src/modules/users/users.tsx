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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '100px'
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
          <div key={user.id} style={{ display: 'flex', width: '100%' }}>
            <User onClick={() => clickUser(user.id, user.name)} {...user} />
          </div>
        ))
      )}
    </div>
  )
}
