import { UserType } from 'common/types'

type UserProps = UserType & {
  onClick?: () => void
}

export const User: React.FC<UserProps> = ({
  // UserType
  id,
  name,
  active,
  role,
  // Props
  onClick
}) => (
  <div
    onClick={onClick}
    style={{
      border: '1px solid black',
      display: 'flex',
      placeItems: 'center',
      flexDirection: 'column',
      padding: '10px',
      gap: '15px',
      minWidth: '200px'
    }}
  >
    <h1>
      User <span>{id}</span>
    </h1>
    <span>Name: {name}</span>
    <span>Active: {active ? 'Yes' : 'No'}</span>
    <span>Role: {role}</span>
  </div>
)
