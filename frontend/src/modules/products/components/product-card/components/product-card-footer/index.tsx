import { memo } from 'react'
import { useTranslation } from 'common/hooks'
import { useProductContext } from 'modules/products/context'
import { Stack, Text } from '@chakra-ui/react'

export const ProductCardFooter: React.FC = memo(() => {
  const { t } = useTranslation()
  const { price, amount } = useProductContext()

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Stack>
        <Text fontSize="3xl">${price}</Text>
        <Text
          fontSize="0.7rem"
          sx={{
            letterSpacing: '1px',
            lineHeight: '0',
            pb: 3,
            textTransform: 'uppercase'
          }}
        >
          Free delivery
        </Text>
      </Stack>

      <Text>
        {t.inStore}: {amount}
        {t.quantity}
      </Text>
    </Stack>
  )
})

ProductCardFooter.displayName = 'ProductCardFooter'
