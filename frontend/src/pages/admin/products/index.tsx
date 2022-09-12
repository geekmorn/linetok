import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { useReadProductsQuery } from 'modules/products/hooks'
import { GetStaticProps, NextPage } from 'next'
import { Stack } from '@chakra-ui/react'

export type ProductsProps = {
  initialData?: ProductType[]
  refetch: () => void
}

const ProductsPage: NextPage<ProductsProps> = ({ initialData }) => {
  const { data, refetch } = useReadProductsQuery({ initialData })

  const state = {
    initialData: data,
    refetch
  }

  return (
    <Stack sx={{ flexDirection: 'column', gap: '15px', width: '100%' }}>
      <ProductCreationForm {...state} />
      <Products {...state} />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const initialData: ProductsProps['initialData'] =
    (await read<ProductType[]>(API.products)) ?? []

  return {
    props: {
      initialData
    }
  }
}

export default ProductsPage
