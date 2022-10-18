import {
  ProductCardDetails,
  ProductCardImages,
  ProductCardFooter
} from './components'
import { ProductType } from 'common/types'
import { Card } from 'components'
import { Badge, Button, Heading, Stack } from '@chakra-ui/react'

type ProductEventsType = {
  onClick?: () => void
}

type ProductProps = ProductType & ProductEventsType

export const ProductCard: React.FC<ProductProps> = ({
  // ProductType
  name,
  price,
  amount,
  description,
  images,
  // Props
  onClick
}) => (
  <Card onClick={onClick}>
    <Badge ml="auto" colorScheme="green">
      Available
    </Badge>
    <ProductCardImages data={images} />
    <Heading size="md">{name}</Heading>
    <ProductCardDetails description={description} />
    <ProductCardFooter price={price} amount={amount} />
    <Button
      _hover={{
        background: 'rgba(0, 0, 0, 0.8)'
      }}
      sx={{ background: 'black', color: 'white', transition: '0.5s ease all' }}
    >
      Buy
    </Button>
  </Card>
)
