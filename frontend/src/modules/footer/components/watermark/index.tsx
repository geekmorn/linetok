import { Text, Image } from '@chakra-ui/react'

export const Watermark = () => (
  <Text
    fontSize="xs"
    _hover={{
      opacity: 1
    }}
    sx={{
      maxWidth: '70px',
      opacity: 0.8,
      position: 'relative',
      transition: '0.5s ease-out all'
    }}
  >
    Designed in 🇵🇱 by 🇺🇦 and
    <Image
      alt="Belarusian"
      src="/Belarus.png"
      boxSize="1.5rem"
      sx={{
        bottom: '-3px',
        lineHeight: 0,
        m: 0,
        p: 0,
        position: 'absolute',
        right: -5
      }}
    />
  </Text>
)
