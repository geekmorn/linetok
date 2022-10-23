import { FooterLinks, Watermark, FooterContent } from './components'
import { Stack } from '@chakra-ui/react'

export const Footer: React.FC = () => (
  <Stack
    as="footer"
    sx={{
      backgroundColor: 'black',
      color: 'white',
      justifyContent: 'space-evenly',
      minHeight: '40vh',
      p: '2rem',
      width: '100%'
    }}
  >
    <FooterLinks />
    <FooterContent />
    <Watermark />
  </Stack>
)
