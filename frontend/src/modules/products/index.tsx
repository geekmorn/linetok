import { EditableProduct } from './components'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import { useTranslation } from 'react-i18next'
import useEvent from 'react-use-event-hook'
import { SUCCESSFULLY_REMOVED_PRODUCT } from 'common/i18n'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import {
  Center,
  Text,
  Wrap,
  WrapItem,
  useToast,
  Highlight
} from '@chakra-ui/react'

export const Products: React.FC<ProductsProps> = ({ initialData: data }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { refetch } = useReadProductsQuery()

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
        <Text>
          <Highlight
            query={['прыходзьце пазней', 'come later']}
            styles={{ bg: 'orange.100', px: '1', py: '1' }}
          >
            {t('products.notFound')}
          </Highlight>
        </Text>
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
