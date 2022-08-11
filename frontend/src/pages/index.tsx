import type { NextPage } from 'next'
import { Center, Text } from '@chakra-ui/react'

export const Home: NextPage = () => {
  return (
    <Center>
      <Text fontSize="50px" color="tomato">
        Welcome to Linetok
      </Text>
    </Center>
  )
}

export default Home
