import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { Center } from '@chakra-ui/react'

export const ProductsPage: React.FC = () => {
  return (
    <Center>
      <ProductCreationForm />
      <Products />
    </Center>
  )
}
