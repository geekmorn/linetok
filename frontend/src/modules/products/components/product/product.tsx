import { ProductType } from 'common/types'
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
  <Stack
    onClick={onClick}
    sx={{
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      gap: '15px',
      minWidth: '300px'
    }}
  >
    <Stack>
      <Stack sx={{ alignSelf: 'flex-end' }} onClick={onRemove}>
        <CloseButton size="sm" />
      </Stack>
      <Heading>Product {id}</Heading>
      <Text>Name: {name}</Text>
      <Text>Price: {price}</Text>
      <Text>Available: {isAvailable ? 'Yes' : 'No'}</Text>
    </Stack>
  </Stack>
)
