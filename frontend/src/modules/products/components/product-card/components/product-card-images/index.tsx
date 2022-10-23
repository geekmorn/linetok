import { memo } from 'react'
import { useProductContext } from 'modules/products/context'
import { Stack, Image } from '@chakra-ui/react'

export const ProductCardImages: React.FC = memo(() => {
  const { images } = useProductContext()

  return (
    <Stack
      sx={{
        placeItems: 'center'
      }}
    >
      {images?.length && (
        <Image src={images[0]} alt="Product hero" boxSize={200} />
      )}
    </Stack>
  )
})

ProductCardImages.displayName = 'ProductCardImages'
