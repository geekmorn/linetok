import { Sidebar } from '../sidebar'
import { FC } from 'react'
import { useTranslation } from 'common/hooks'
import Link from 'next/link'
import { Heading, Stack } from '@chakra-ui/react'

export const Menu: FC = () => {
  const { t } = useTranslation()

  return (
    <Stack
      direction="row"
      gap={5}
      sx={{
        placeItems: 'center'
      }}
    >
      <Sidebar />
      <Heading>
        <Link href="/">{t.Linetok}</Link>
      </Heading>
    </Stack>
  )
}
