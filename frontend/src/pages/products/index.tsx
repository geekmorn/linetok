import { Stack } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils/crud'
import { Products } from 'modules'
import { useReadProductsQuery } from 'modules/products/hooks'
import { ProductsProps } from 'pages/admin/products'

const ProductsPage: NextPage<ProductsProps> = ({ initialData }) => {
  const { data } = useReadProductsQuery({ initialData })

  return (
    <Stack sx={{ flexDirection: 'column', gap: '15px', width: '100%' }}>
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

export default ProductsPage
