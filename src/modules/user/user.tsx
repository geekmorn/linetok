type UserProps = {
  id: number
  name: string
  age: number
  isActive: boolean
}

export const User: React.FC<UserProps> = ({ id, name, age, isActive }) => (
  <div
    style={{
      border: '1px solid black',
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
