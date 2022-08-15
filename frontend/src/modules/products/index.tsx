import { useCallback } from 'react'
import { ProductType } from 'common/types'
import { useSnackbar } from 'notistack'
import { ProductsProps } from 'pages/admin/products'
import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { Product } from './components'
import { useDestroyProductMutation } from './hooks'

export const Products: React.FC<ProductsProps> = ({
  data,
  isLoading,
  refetch
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync, isLoading: isRemoveLoading } =
    useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const remove = useCallback(
    async (id: string) => {
      await mutateAsync(id)
      refetch()
      enqueueSnackbar('Product removed.', { variant: 'success' })
    },
    [enqueueSnackbar, mutateAsync, refetch]
  )

  return (
    <>
      {isLoading ? (
        <Stack style={{ fontSize: '75px' }}>
          <Spinner />
        </Stack>
      ) : noDataReceived ? (
        <Text>No products found. Please, come later! 🤩</Text>
      ) : (
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
      )}
    </>
  )
}
