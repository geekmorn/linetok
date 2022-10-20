import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { Products, ProductCreationForm, useReadProductsQuery } from 'modules'
import { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Stack
} from '@chakra-ui/react'

export type ProductsProps = {
  initialData?: ProductType[]
}

const AdminProductsPage: NextPage<ProductsProps> = ({ initialData }) => {
  const { data } = useReadProductsQuery({ initialData })

  return (
    <Stack sx={{ flexDirection: 'column', gap: '15px', width: '100%' }}>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <NextLink passHref href="/">
            <BreadcrumbLink as={Link}>Home</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink passHref href="/admin">
            <BreadcrumbLink as={Link}>Admin</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink passHref href="/admin/products">
            <BreadcrumbLink as={Link} isCurrentPage>
              Products
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
