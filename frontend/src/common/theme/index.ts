import { Button, Skeleton, TableContainer } from 'common/theme/components'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Button,
    Skeleton,
    TableContainer
  },
  fonts: {
    body: `'Jost', sans-serif`,
    heading: `'Jost', sans-serif`
  }
})
