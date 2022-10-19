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

export const Users: React.FC<UsersProps> = ({ initialData: data }) => {
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
    <TableContainer
      sx={{ border: '1px solid black', borderRadius: '1rem', p: '50px 0' }}
    >
      <Table variant="simple">
        <TableCaption>List of Linetok users</TableCaption>
        <Thead>
          <Tr>
            <Th>Active</Th>
            <Th>Email</Th>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((user: UserType) => (
            <Tr key={user.id}>
              <Td>{!user.active ? <Check2 color="green" /> : <BagX />}</Td>
              <Td>{user.email}</Td>
              <Td>{user.name}</Td>
              <Td>{user.surname}</Td>
              <Td>{user.role}</Td>
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
            <Th>Active</Th>
            <Th>Email</Th>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
