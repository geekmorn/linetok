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

  const {
    mutateAsync,
    isLoading: isRemoveLoading,
    isSuccess: isRemoveSuccess
  } = useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const remove = useCallback(
    async (id: number) => {
      await mutateAsync(id)
      refetch()
      if (isRemoveSuccess) {
        toast({
          title: 'Product removed',
          description: "We've just removed the product for you.",
          status: 'success',
          isClosable: true
        })
        return
      }
      toast({
        title: 'Remove failed',
        description:
          'Something went wrong when we tried to remove the product.',
        status: 'error',
        isClosable: true
      })
      return
    },
    [mutateAsync, refetch, isRemoveSuccess, toast]
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
            loading={isRemoveLoading}
            {...product}
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
