import { useCallback } from 'react'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import {
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useToast
} from '@chakra-ui/react'
import { Product } from './components'
import { useDestroyProductMutation } from './hooks'

export const Products: React.FC<ProductsProps> = ({
  data,
  isLoading,
  refetch
}) => {
  const toast = useToast()

  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const remove = useCallback(
    async (id: number) => {
      await mutateAsync(id, {
        onSuccess: () => {
          refetch()
          toast({
            title: 'Product removed',
            description: "We've just removed the product for you.",
            status: 'success',
            isClosable: true
          })
        },
        onError: () => {
          toast({
            title: 'Remove failed',
            description:
              'Something went wrong when we tried to remove the product.',
            status: 'error',
            isClosable: false
          })
        }
      })
    },
    [mutateAsync, refetch, toast]
  )

  if (isLoading) {
    return (
      <Stack style={{ fontSize: '75px' }}>
        <Spinner />
      </Stack>
    )
  }

  if (noDataReceived) {
    return <Text>No products found. Please, come later! 🤩</Text>
  }

  return (
    <Wrap>
      {data.map((product: ProductType) => (
        <WrapItem key={`${product.id} <Product />`}>
          <Product
            onRemove={() => remove(product.id)}
            loading={isDestroyLoading}
            {...product}
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
