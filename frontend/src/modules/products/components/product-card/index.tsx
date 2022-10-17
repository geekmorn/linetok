import { useTranslation } from 'common/hooks'
import { ProductType } from 'common/types'
import { Card } from 'components'
import ChakraCarousel from 'components/carousel'
import { Button, Heading, Image, Stack, Text } from '@chakra-ui/react'

type ProductEventsType = {
  onClick?: () => void
}

function capsFirst(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type ProductProps = ProductType & ProductEventsType

export const ProductCard: React.FC<ProductProps> = ({
  // ProductType
  name,
  price,
  amount,
  description,
  images,
  // Props
  onClick
}) => {
  const { t } = useTranslation()

  return (
    <Card onClick={onClick}>
      <Stack sx={{ placeItems: 'center' }}>
        {images?.length && (
          <Image src={images[0]} alt="Product hero" boxSize={200} />
        )}
        <ChakraCarousel gap={32}>
          {images?.slice()?.map((image, index) => (
            <Image src={image} alt="Product" key={`${index} product`} />
          ))}
        </ChakraCarousel>
      </Stack>
      <Heading size="md">{name}</Heading>
      <Text fontSize="xs">
        {description.length > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </Text>
      <Text fontSize="xs">Processor: Apple M1</Text>
      <Text fontSize="xs">RAM: 8GB</Text>
      <Text fontSize="xs">Graphics: Apple M1</Text>
      <Text fontSize="xs">Screen: LED IPS Retina</Text>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack>
          <Text fontSize="3xl">${price}</Text>
          <Text fontSize="xs">Free delivery</Text>
        </Stack>

        <Text>
          {t.inStore}: {amount}
          {t.quantity}
        </Text>
      </Stack>

      <Button>Buy</Button>
    </Card>
  )
}
