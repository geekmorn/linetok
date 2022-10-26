import { FC } from 'react'
import { Stack, Text, Spinner } from '@chakra-ui/react'

type LoaderProps = {
  loading: boolean
}

export const Loader: FC<LoaderProps> = ({ loading }) =>
  loading ? (
    <Stack
      direction="column"
      sx={{
        pb: 5,
        placeItems: 'center'
      }}
    >
      <Text>Loading</Text>
      <Spinner />
    </Stack>
  ) : (
    <></>
  )
