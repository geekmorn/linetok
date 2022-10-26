import { EditableProduct, Loader, ProductCard } from './components'
import { ProductProvider } from './context'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import { mockProducts } from './mocks'
import { FC } from 'react'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import { SUCCESSFULLY_REMOVED_PRODUCT } from 'common/i18n'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import { Center, useToast, Text, Highlight, Skeleton } from '@chakra-ui/react'

export const Products: FC<ProductsProps> = ({ initialData: data }) => {
  const toast = useToast()
  const { t } = useTranslation()
  const { refetch } = useReadProductsQuery()

  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const dataReceived = Boolean(data?.length)
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
    <>
      <Loader loading={noDataReceived} />
      <Center
        sx={{
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {data?.map((product: ProductType) => (
          <ProductProvider context={product} key={product.id}>
            <EditableProduct
              onRemove={() => onRemove(product.id)()}
              loading={isDestroyLoading}
            />
          </ProductProvider>
        ))}
        {mockProducts.map((mockProduct) => (
          <Skeleton
            key={mockProduct.id}
            isLoaded={dataReceived}
            fadeDuration={1}
            speed={1}
          >
            <ProductProvider context={mockProduct}>
              <ProductCard />
            </ProductProvider>
          </Skeleton>
        ))}
      </Center>
    </>
  )
}
