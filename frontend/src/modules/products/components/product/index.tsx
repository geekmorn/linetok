import { ProductType } from 'common/types'
import { AlertButton, Card, EditableInput } from 'components'
import { Heading, Stack, Text } from '@chakra-ui/react'

type ProductProps = ProductType & {
  loading?: boolean
  onClick?: () => void
  onRemove?: () => void
}

export const Product: React.FC<ProductProps> = ({
  // ProductType
  id,
  name,
  price,
  available,
  // Props
  loading,
  onClick,
  onRemove
}) => (
  <Card onClick={onClick}>
    <Stack>
      <Stack sx={{ alignSelf: 'flex-end' }}>
        <AlertButton
          loading={loading}
          onYes={onRemove}
          buttonHeader="X"
          alertHeader="Remove this product?"
          alertBody="This action can not be undone."
        />
      </Stack>
      <Heading sx={{ textAlign: 'center' }}>Product {id}</Heading>
      <EditableInput value={name} />
      <EditableInput value={price} />
      <Text>Available: {available ? 'Yes' : 'No'}</Text>
    </Stack>
  </Card>
)
