import { ProductType } from 'common/types'
import { AlertButton, Card, EditableInput } from 'components'
import { Stack, Text } from '@chakra-ui/react'

type ProductProps = ProductType & {
  loading?: boolean
  onClick?: () => void
  onRemove?: () => void
}

export const EditableProduct: React.FC<ProductProps> = ({
  // ProductType
  id,
  name,
  price,
  amount,
  description,
  images,
  // Props
  loading,
  onClick,
  onRemove
}) => (
  <Card onClick={onClick}>
    <Stack sx={{ alignSelf: 'flex-end' }}>
      <AlertButton
        loading={loading}
        onYes={onRemove}
        buttonHeader="X"
        alertHeader="Remove this product?"
        alertBody="This action can not be undone."
      />
    </Stack>
    <EditableInput value={name} />
    <EditableInput value={description} />
    <EditableInput value={price} />
    <Text>На складе: {amount}шт.</Text>
  </Card>
)
