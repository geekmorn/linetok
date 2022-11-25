import { FC } from 'react'
import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link
} from '@chakra-ui/react'

export const UsersBreadcrumb: FC = () => (
  <Breadcrumb fontWeight="medium" fontSize="sm">
    <BreadcrumbItem>
      <NextLink passHref href="/">
        <BreadcrumbLink as={Link} href="/">
          Home
        </BreadcrumbLink>
      </NextLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <NextLink passHref href="/admin">
        <BreadcrumbLink as={Link}>Admin</BreadcrumbLink>
      </NextLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <NextLink passHref href="/admin/users">
        <BreadcrumbLink as={Link} isCurrentPage>
          Users
        </BreadcrumbLink>
      </NextLink>
    </BreadcrumbItem>
  </Breadcrumb>
)
