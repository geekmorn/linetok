import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { Users } from 'modules'
import { useGetUsersQuery } from 'modules/users/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { Center } from '@chakra-ui/react'

export type UsersProps = {
  data?: UserType[]
  isLoading: boolean
  refetch: () => void
}

const UsersPage: NextPage<UsersProps> = ({ data: initialData }) => {
  const { data, isLoading, refetch } = useGetUsersQuery({ initialData })

  const state = {
    data,
    isLoading,
    refetch
  }

  return (
    <Center sx={{ flexDirection: 'column' }}>
      <Users {...state} />
    </Center>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { getAll } = useApi<UserType>('/users')
  const data = await getAll()

  return {
    props: {
      data
    }
  }
}

export default UsersPage
