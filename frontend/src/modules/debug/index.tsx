import { FC } from 'react'
import { ProductType } from 'common/types'
import { ProductCard } from 'modules'
import { ProductProvider } from 'modules/products/context'
import { Skeleton } from '@chakra-ui/react'

export type DebugModeType = 'actual' | 'mock' | 'skeletons'

type DebugProps = {
  data: ProductType
  dataReceived: boolean
  mode: DebugModeType
}

export const Debug: FC<DebugProps> = ({ data, dataReceived, mode }) => (
  <>
    {mode === 'skeletons' ? (
      <Skeleton isLoaded={dataReceived} fadeDuration={1} speed={1}>
        <ProductProvider context={data}>
          <ProductCard />
        </ProductProvider>
      </Skeleton>
    ) : mode === 'mock' ? (
      <ProductProvider context={data}>
        <ProductCard />
      </ProductProvider>
    ) : (
      <></>
    )}
  </>
)
