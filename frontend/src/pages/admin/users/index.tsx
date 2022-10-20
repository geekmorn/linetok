import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { Users, useReadUsersQuery } from 'modules'
import { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Stack
} from '@chakra-ui/react'

export type UsersProps = {
  initialData: UserType[]
}

const AdminUsersPage: NextPage<UsersProps> = ({ initialData }) => {
  const { data } = useReadUsersQuery({ initialData })

  return (
    <Stack sx={{ flexDirection: 'column' }}>
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
      <Users initialData={data} />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const initialData = await read<UserType[]>(API.users)

  return {
    props: {
      initialData
    }
  }
}

export default AdminUsersPage
