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
      Карыстальнік <Text>{id}</Text>
    </Heading>
    <Text>Імя: {name}</Text>
    <Text>Чы актыўны: {active ? 'Yes' : 'No'}</Text>
    <Text>Роля: {role}</Text>
  </Card>
)
