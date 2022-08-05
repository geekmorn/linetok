import { Stack, Text } from '@chakra-ui/react'
import { Product } from './components'
import { useGetProductsQuery } from './hooks'

export const Products: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery()

  const noDataReceived = !data || data.length === 0

  const openProduct = (id: string, name: string) => {
    alert(`Product with id '${id}' and name '${name}' opened`)
  }

  return (
    <>
      {isLoading ? (
        <Stack style={{ fontSize: '75px' }}>
          <Text>🫥 Loading..</Text>
        </Stack>
      ) : noDataReceived ? (
        <Text>No products found. Please, come later! 🤩</Text>
      ) : (
        data?.map((product) => (
          <Product
            onClick={() => openProduct(product.id, product.name)}
            key={product.id}
            {...product}
          />
        ))
      )}
    </>
  )
}
