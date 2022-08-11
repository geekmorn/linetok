import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { useGetProductsQuery } from 'modules/products/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { Center } from '@chakra-ui/react'

export type ProductsProps = {
  data?: ProductType[]
  isLoading: boolean
  refetch: () => void
}

const ProductsPage: NextPage<ProductsProps> = ({ data: initialData }) => {
  const { data, isLoading, refetch } = useGetProductsQuery({ initialData })

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
  const { getAll } = useApi<ProductType>('/products')
  const data = await getAll()

  return {
    props: {
      data
    }
  }
}

export default ProductsPage
