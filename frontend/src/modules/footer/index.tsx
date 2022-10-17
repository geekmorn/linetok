import { Center, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => (
  <Center
    as="footer"
    sx={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '50vh',
      width: '100%'
    }}
  >
    <Text>&copy; {new Date().getFullYear()} linetok.com ❤️</Text>
  </Center>
)
