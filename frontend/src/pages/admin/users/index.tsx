import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { Users } from 'modules'
import { useReadUsersQuery } from 'modules/users/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { Center } from '@chakra-ui/react'

export type UsersProps = {
  data?: UserType[]
  isLoading: boolean
  refetch: () => void
}

const UsersPage: NextPage<UsersProps> = ({ data: initialData }) => {
  const { data, isLoading, refetch } = useReadUsersQuery({ initialData })

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
  const data = (await read<UserType>(API.users)) ?? null

  return { props: { data } }
}

export default UsersPage
