import { Center, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => (
  <Center
    as="footer"
    sx={{
      backgroundColor: 'black',
      bottom: 0,
      color: 'white',
      height: '400px',
      left: 0,
      position: 'absolute',
      width: '100%'
    }}
  >
    <Text>&copy; {new Date().getFullYear()} linetok.com ❤️</Text>
  </Center>
)
