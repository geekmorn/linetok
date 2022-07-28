import { User } from 'common/types/User'
import { useGetUsersQuery } from './hooks'

export const Users: React.FC = () => {
  const query = useGetUsersQuery()
  const { data } = query

  return (
    <div>
      {data?.users?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.age}</p>
          <p>{user.isActive}</p>
        </div>
      ))}
    </div>
  )
}
