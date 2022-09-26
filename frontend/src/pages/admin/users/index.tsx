import { Stack } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { Users } from 'modules'
import { useReadUsersQuery } from 'modules/users/hooks'

export type UsersProps = {
  initialData: UserType[]
}

const AdminUsersPage: NextPage<UsersProps> = ({ initialData }) => {
  const { data } = useReadUsersQuery({ initialData })

  return (
    <Stack sx={{ flexDirection: 'column' }}>
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
