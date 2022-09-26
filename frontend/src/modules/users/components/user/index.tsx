import { Heading, Text } from '@chakra-ui/react'
import { UserType } from 'common/types'
import { Card } from 'components'

type EventsType = {
  onClick?: () => void
}

type UserProps = UserType & EventsType

export const User: React.FC<UserProps> = ({
  // UserType
  id,
  name,
  active,
  role,
  // Props
  onClick
}) => (
  <Card onClick={onClick}>
    <Heading>
      User <Text>{id}</Text>
    </Heading>
    <Text>Name: {name}</Text>
    <Text>Active: {active ? 'Yes' : 'No'}</Text>
    <Text>Role: {role}</Text>
  </Card>
)
