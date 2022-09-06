import { Center, Heading } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
    <Center
      sx={{
        height: '40px',
        backgroundColor: 'slateblue'
      }}
    >
      <hr />
      <Heading>Yo!</Heading>
      <strong>Footer will be here.</strong>
    </Center>
  )
}
