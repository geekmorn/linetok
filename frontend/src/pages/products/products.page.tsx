import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { Stack } from '@chakra-ui/react'

export const ProductsPage: React.FC = () => {
  return (
    <Stack>
      <ProductCreationForm />
      <Products />
    </Stack>
  )
}
