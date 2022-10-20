import type { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Heading,
  Highlight,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'

const AdminProductsPage: NextPage = () => (
  <Stack
    sx={{
      background: '#f1f1f1',
      flexDirection: 'column',
      gap: '15px',
      minHeight: '50vh',
      p: '3rem 25%',
      placeItems: 'center',
      width: '100%'
    }}
  >
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
        <NextLink passHref href="/admin/help">
          <BreadcrumbLink as={Link} isCurrentPage>
            Help
          </BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Heading>Help is here</Heading>
    <Stack>
      <Text>
        If you feel stuck, we created this page to explain how does the
        adminpanel work.
      </Text>
      <Divider />
      <Text>
        <Highlight
          query="SuperAdmin"
          styles={{ background: 'orange', borderRadius: '1rem', p: 1.5 }}
        >
          In Linetok, there are 3 type of roles: — SuperAdmin — Admin — User
          Also, there are 2 instances on which you can make operations: —
          Products — Users
        </Highlight>
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        quidem dolore. Accusamus ab minus laboriosam qui assumenda, corrupti ex.
        Quis sed tempora magni architecto ipsum cumque voluptate sit voluptas
        error. Delectus doloremque sit corporis rerum omnis ipsa? Illo similique
        aliquam minima odio nobis, sint soluta ratione alias sit perferendis.
        Expedita nisi doloribus, quos eligendi ipsam sequi ullam praesentium
        dignissimos! Voluptates. Fuga ex quibusdam assumenda esse officiis ad
        dolorum iste debitis. Eaque corporis quasi similique praesentium quis at
        totam debitis excepturi ratione? Ea sint ipsum laudantium possimus
        tempore nulla laboriosam iure. Deleniti voluptatibus, voluptate eius
        rerum non esse est cum placeat atque adipisci, commodi, sequi molestias
        quis! Eum dicta repellat necessitatibus modi amet deleniti est tempora?
        Quam dolore voluptas earum debitis. Nesciunt ducimus provident illum
        accusantium labore non soluta voluptate quisquam tenetur ratione
        laboriosam id nihil eos eveniet esse, quaerat repudiandae nemo corrupti
        alias? Sint enim expedita quasi illo! Voluptatum, illo! Consectetur
        exercitationem accusantium totam iusto vel, nesciunt quos at eius
        officiis temporibus ipsam nobis doloremque fuga vero, nisi voluptatibus
        enim quisquam dolorum adipisci. Vel voluptatum iste distinctio
        molestiae! Esse, maxime. Autem sit debitis temporibus fuga suscipit
        quibusdam ducimus sunt sapiente esse, beatae placeat provident, odit.
      </Text>
    </Stack>
  </Stack>
)

export default AdminProductsPage
