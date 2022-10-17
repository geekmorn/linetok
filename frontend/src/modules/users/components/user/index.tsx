import { useTranslation } from 'common/hooks'
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
}) => {
  const { t } = useTranslation()

  return (
    <Card onClick={onClick}>
      <Heading>
        {t.user.title} <Text>{id}</Text>
      </Heading>
      <Text>
        {t.user.name}: {name}
      </Text>
      <Text>
        {t.user.active}: {active ? 'Yes' : 'No'}
      </Text>
      <Text>
        {t.user.role}: {role}
      </Text>
    </Card>
  )
}
