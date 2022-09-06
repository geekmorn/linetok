import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { Users } from 'modules'
import { useReadUsersQuery } from 'modules/users/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { Stack } from '@chakra-ui/react'

export type UsersProps = {
  initialData: UserType[]
  data?: UserType[]
  isLoading: boolean
  refetch: () => void
}

const UsersPage: NextPage<UsersProps> = ({ initialData }) => {
  const { data, isLoading, refetch } = useReadUsersQuery({ initialData })

  const state = {
    initialData: data,
    data,
    isLoading,
    refetch
  }

  return (
    <Stack sx={{ flexDirection: 'column' }}>
      <Users {...state} />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData: UsersProps['initialData'] =
    (await read<UserType[]>(API.users)) ?? []

  return {
    props: {
      initialData
    }
  }
}

export default UsersPage
