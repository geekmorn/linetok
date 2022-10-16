import { UserType } from 'common/types'
import { Card } from 'components'
import { Heading, Text } from '@chakra-ui/react'

type UserEventsType = {
  onClick?: () => void
}

type UserProps = UserType & UserEventsType

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
