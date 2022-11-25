import { FC } from 'react'
import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link
} from '@chakra-ui/react'

export const ProductsBreadcrumb: FC = () => (
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
)
