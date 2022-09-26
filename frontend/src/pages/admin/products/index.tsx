import { Stack } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { Products } from 'modules'
import { ProductCreationForm } from 'modules/products/components'
import { useReadProductsQuery } from 'modules/products/hooks'

export type ProductsProps = {
  initialData?: ProductType[]
}

const AdminProductsPage: NextPage<ProductsProps> = ({ initialData }) => {
  const { data } = useReadProductsQuery({ initialData })

  return (
    <Stack sx={{ flexDirection: 'column', gap: '15px', width: '100%' }}>
      <ProductCreationForm />
      <Products initialData={data} />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await read<ProductType[]>(API.products)

  return {
    props: {
      initialData
    }
  }
}

export default AdminProductsPage
