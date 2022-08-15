import { API_ENDPOINTS } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { useReadProductsQuery } from 'modules/products/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { Center } from '@chakra-ui/react'

export type ProductsProps = {
  data?: ProductType[]
  isLoading: boolean
  refetch: () => void
}

const ProductsPage: NextPage<ProductsProps> = ({ data: initialData }) => {
  const { data, isLoading, refetch } = useReadProductsQuery({ initialData })

  const state = {
    data,
    isLoading,
    refetch
  }

  return (
    <Center sx={{ flexDirection: 'column', gap: '15px' }}>
      <ProductCreationForm {...state} />
      <Products {...state} />
    </Center>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = (await read<ProductType>(API_ENDPOINTS.products)()) ?? null

  return { props: { data } }
}

export default ProductsPage
