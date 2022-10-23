import { Button, Skeleton, TableContainer } from 'common/theme/components'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: `'Jost', sans-serif`,
    body: `'Jost', sans-serif`,
  },
  components: {
    Button,
    Skeleton,
    TableContainer
  }
})
