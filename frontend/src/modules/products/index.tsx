import { EditableProduct, ProductCard } from './components'
import { ProductProvider } from './context'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import { mockProducts } from './mocks'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import { SUCCESSFULLY_REMOVED_PRODUCT } from 'common/i18n'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import { Center, useToast, Text, Highlight } from '@chakra-ui/react'

export const Products: React.FC<ProductsProps> = ({ initialData: data }) => {
  const toast = useToast()
  const { t } = useTranslation()
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
  // TODO remove
  // && !mockProducts
  if (noDataReceived && !mockProducts) {
    return (
      <Center>
        <Text>
          <Highlight
            query={['прыходзьце пазней', 'come later']}
            styles={{ bg: 'orange.100', px: '1', py: '1' }}
          >
            {t.products.notFound}
          </Highlight>
        </Text>
      </Center>
    )
  }

  return (
    <Center
      sx={{
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      {data?.map((product: ProductType) => (
        <EditableProduct
          key={`${product.id} <Product />`}
          onRemove={() => onRemove(product.id)}
          loading={isDestroyLoading}
          {...product}
        />
      ))}
      {mockProducts.map((mockProduct) => (
        <ProductProvider context={mockProduct} key={mockProduct.id}>
          <ProductCard />
        </ProductProvider>
      ))}
    </Center>
  )
}
