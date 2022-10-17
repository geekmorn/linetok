import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils/crud'
import { Banner, Products, Breadcrumbs, useReadProductsQuery } from 'modules'
import { GetStaticProps, NextPage } from 'next'
import { ProductsProps } from 'pages/admin/products'

const ProductsPage: NextPage<ProductsProps> = ({ initialData }) => {
  const { data } = useReadProductsQuery({ initialData })

  return (
    <>
      <Breadcrumbs />
      <Banner />
      <Products initialData={data} />
    </>
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
