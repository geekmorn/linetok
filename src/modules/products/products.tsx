import { Product } from 'modules'
import { Center, Stack, Text } from '@chakra-ui/react'
import { ProductCreationForm } from './components'
import { useGetProductsQuery } from './hooks'

export const Products: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery()

  const noProductsDataReceived = !data || data.length === 0

  const clickProduct = (id: string, name: string) => {
    alert(`Product with id '${id}' and name '${name}' clicked`)
  }

  return (
    <Center>
      <Stack>
        {isLoading ? (
          <Stack style={{ fontSize: '75px' }}>
            <Text>🫥 Loading..</Text>
          </Stack>
        ) : noProductsDataReceived ? (
          <Text>No products found. Please, come later! 🤩</Text>
        ) : (
          data?.map((product) => (
            <Product
              onClick={() => clickProduct(product.id, product.name)}
              key={product.id}
              {...product}
            />
          ))
        )}
      </Stack>
    </Center>
  )
}
