import { IUser } from 'common/interfaces'

interface UserProps extends IUser {
  onClick?: () => void
}

export const User: React.FC<UserProps> = ({
  // IUser
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
      border: '1px solid black',
      padding: '25px 55px',
      maxWidth: '300px',
      display: 'grid',
      placeItems: 'center',
      marginBottom: '5px'
    }}
  >
    <h1>User</h1>
    <span>ID: {id}</span>
    <span>Name: {name}</span>
    <span>Age: {age}</span>
    <span>Is Active: {isActive ? 'Yes' : 'No'}</span>
  </div>
)
