import { EditableProduct, Loader } from './components'
import { ProductProvider } from './context'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import { mockProducts } from './mocks'
import { FC, useState } from 'react'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import { SUCCESSFULLY_REMOVED_PRODUCT } from 'common/i18n'
import { ProductType } from 'common/types'
import { Debug, DebugModeType } from 'modules'
import { ProductsProps } from 'pages/admin/products'
import { Center, useToast, Text, Highlight } from '@chakra-ui/react'

const isProductionMode = process.env.NODE_ENV === 'production'

export const Products: FC<ProductsProps> = ({ initialData: data }) => {
  const [debugMode] = useState<DebugModeType>('mock')
  const toast = useToast()
  const { t } = useTranslation()
  const { refetch } = useReadProductsQuery()
  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const dataReceived = Boolean(data?.length)
  const noDataReceived = !data || data?.length === 0

  const onRemove = useEvent((id: number) => async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        refetch()
        toast(SUCCESSFULLY_REMOVED_PRODUCT)
      }
    })
  })

  if (isProductionMode) {
    return (
      <>
        <Loader loading={noDataReceived} />
        {noDataReceived && (
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
        )}
        {data?.map((product: ProductType) => (
          <ProductProvider context={product} key={product.id}>
            <EditableProduct
              onRemove={() => onRemove(product.id)()}
              loading={isDestroyLoading}
            />
          </ProductProvider>
        ))}
      </>
    )
  }

  return (
    <>
      <Center
        sx={{
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        {mockProducts.map((mockProduct) => (
          <Debug
            mode={debugMode}
            data={mockProduct}
            dataReceived={dataReceived}
            key={mockProduct.id}
          />
        ))}
      </Center>
    </>
  )
}
