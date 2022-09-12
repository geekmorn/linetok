import { Center, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => (
  <Center
    as="footer"
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '400px',
      width: '100%',
      backgroundColor: 'black',
      color: 'white'
    }}
  >
    <Text>&copy; {new Date().getFullYear()}, linetok.com ❤️</Text>
  </Center>
)
