import {
  ProductCardDetails,
  ProductCardImages,
  ProductCardFooter
} from './components'
import { memo } from 'react'
import { Card } from 'components'
import { useProductContext } from 'modules/products/context'
import { Badge, Button, Heading, Stack } from '@chakra-ui/react'

type ProductProps = {
  onClick?: () => void
}

export const ProductCard: React.FC<ProductProps> = memo(({ onClick }) => {
  const { name } = useProductContext()

  return (
    <Card onClick={onClick}>
      <Badge ml="auto" colorScheme="green">
        Available
      </Badge>
      <ProductCardImages />
      <Heading size="md">{name}</Heading>
      <Stack
        sx={{
          justifyContent: 'flex-end'
        }}
      >
        <ProductCardDetails />
        <ProductCardFooter />
        <Button
          _hover={{
            background: 'rgba(0, 0, 0, 0.8)'
          }}
          sx={{
            background: 'black',
            color: 'white',
            transition: '0.5s ease all'
          }}
        >
          Buy
        </Button>
      </Stack>
    </Card>
  )
})

ProductCard.displayName = 'ProductCard'
