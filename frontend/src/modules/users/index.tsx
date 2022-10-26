import { FC } from 'react'
import {
  BagX,
  Check2,
  PencilSquare,
  PersonXFill,
  SlashCircleFill
} from 'react-bootstrap-icons'
import { useTranslation } from 'common/hooks'
import { UserType } from 'common/types'
import { UsersProps } from 'pages/admin/users'
import {
  IconButton,
  Center,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Stack
} from '@chakra-ui/react'

export const Users: FC<UsersProps> = ({ initialData: data }) => {
  const { t } = useTranslation()

  const noDataReceived = !data || data.length === 0

  if (noDataReceived) {
    return (
      <Center>
        <Text>{t.users.notFound}</Text>
      </Center>
    )
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of Linetok users</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">Active</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Surname</Th>
            <Th textAlign="center">Role</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((user: UserType) => (
            <Tr key={user.id}>
              <Td>{user.active ? <Check2 color="green" /> : <BagX />}</Td>
              <Td textAlign="center">{user.email}</Td>
              <Td textAlign="center">{user.name}</Td>
              <Td textAlign="center">{user.surname}</Td>
              <Td textAlign="center">{user.role}</Td>
              <Td>
                <Stack direction="row" maxW="75px">
                  <IconButton aria-label="Edit" icon={<PencilSquare />} />
                  <IconButton aria-label="Remove" icon={<PersonXFill />} />
                  <IconButton aria-label="Ban" icon={<SlashCircleFill />} />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center">Active</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Surname</Th>
            <Th textAlign="center">Role</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
