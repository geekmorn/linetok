import { FC } from 'react'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

export const Breadcrumbs: FC = () => (
  <Breadcrumb fontWeight="medium" fontSize="sm">
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href="/">
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} href="/products" isCurrentPage>
        Products
      </BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)
