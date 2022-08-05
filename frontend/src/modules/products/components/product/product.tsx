import { ProductType } from 'common/types'
import { Card, EditableInput } from 'components'
import { CloseButton, Heading, Stack, Text } from '@chakra-ui/react'

type ProductProps = ProductType & {
  onClick?: () => void
  onRemove?: () => void
}

export const Product: React.FC<ProductProps> = ({
  // ProductType
  id,
  name,
  price,
  isAvailable,
  // Props
  onClick,
  onRemove
}) => (
  <Card onClick={onClick}>
    <Stack>
      <Stack sx={{ alignSelf: 'flex-end' }} onClick={onRemove}>
        <CloseButton size="sm" />
      </Stack>
      <Heading sx={{ textAlign: 'center' }}>Product {id}</Heading>
      <EditableInput value={name} />
      <EditableInput value={price} />
      <Text>Available: {isAvailable ? 'Yes' : 'No'}</Text>
    </Stack>
  </Card>
)
