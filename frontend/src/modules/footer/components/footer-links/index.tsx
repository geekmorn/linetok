import { FC } from 'react'
import { Routes } from 'modules'
import { Stack } from '@chakra-ui/react'

export const FooterLinks: FC = () => (
  <Stack
    direction="row"
    _hover={{
      opacity: 1
    }}
    sx={{
      opacity: 0.8,
      textTransform: 'uppercase',
      transition: '0.5s ease all'
    }}
  >
    <Routes />
  </Stack>
)
