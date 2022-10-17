import ChakraCarousel from 'components/carousel'
import { Stack, Image } from '@chakra-ui/react'

type ImagesProps = {
  data?: string[]
}

export const ProductCardImages: React.FC<ImagesProps> = ({ data }) => (
  <Stack
    sx={{
      placeItems: 'center'
    }}
  >
    {data?.length && <Image src={data[0]} alt="Product hero" boxSize={200} />}
    <ChakraCarousel gap={32}>
      {data?.slice()?.map((image, index) => (
        <Image src={image} alt="Product" key={`${index} product`} />
      ))}
    </ChakraCarousel>
  </Stack>
)
