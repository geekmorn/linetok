import { UserType } from 'common/types'

type UserProps = UserType & {
  onClick?: () => void
}

export const User: React.FC<UserProps> = ({
  // UserType
  id,
  name,
  age,
  isActive,
  // Props
  onClick
}) => (
  <div
    onClick={onClick}
    style={{
      border: '3px solid black',
      padding: '50px',
      maxWidth: '400px',
      width: '100%',
      display: 'flex',
      placeItems: 'center',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '15px'
    }}
  >
    <h1>User</h1>
    <span>ID: {id}</span>
    <span>Name: {name}</span>
    <span>Age: {age}</span>
    <span>Is Active: {isActive ? 'Yes' : 'No'}</span>
  </div>
)
