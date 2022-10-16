import { EditableProduct } from './components'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import useEvent from 'react-use-event-hook'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import {
  Center,
  Text,
  Wrap,
  WrapItem,
  useToast,
  UseToastOptions
} from '@chakra-ui/react'

const SUCCESSFULLY_REMOVED_PRODUCT: UseToastOptions = {
  description: "We've just removed the product for you.",
  isClosable: true,
  status: 'success',
  title: 'Product removed'
}

export const Products: React.FC<ProductsProps> = ({ initialData: data }) => {
  const toast = useToast()
  const { refetch } = useReadProductsQuery({})

  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const onRemove = useEvent((id: string) => async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        refetch()
        toast(SUCCESSFULLY_REMOVED_PRODUCT)
      }
    })
  })

  if (noDataReceived) {
    return (
      <Center>
        <Text>No products found. Please, come later! 🤩</Text>
      </Center>
    )
  }

  return (
    <Wrap>
      {data?.map((product: ProductType) => (
        <WrapItem key={`${product.id} <Product />`}>
          <EditableProduct
            onRemove={() => onRemove(product.id)}
            loading={isDestroyLoading}
            {...product}
          />
        </WrapItem>
      ))}
    </Wrap>
  )
}
