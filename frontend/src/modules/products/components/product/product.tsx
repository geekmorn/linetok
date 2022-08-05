import { ProductType } from 'common/types'
import { Heading, Stack, Text } from '@chakra-ui/react'

type ProductProps = ProductType & {
  onClick?: () => void
}

export const Product: React.FC<ProductProps> = ({
  // ProductType
  id,
  name,
  price,
  isAvailable,
  // Props
  onClick
}) => (
  <Stack
    onClick={onClick}
    sx={{
      border: '1px solid black',
      padding: '25px 55px',
      maxWidth: '300px',
      display: 'grid',
      placeItems: 'center',
      marginBottom: '5px'
    }}
  >
    <Stack>
      <Heading>Product</Heading>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Price: {price}</Text>
      <Text>Is Available: {isAvailable ? 'Yes' : 'No'}</Text>
    </Stack>
  </Stack>
)
