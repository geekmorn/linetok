import { useTranslation } from 'common/hooks'
import { Badge, Stack, Text } from '@chakra-ui/react'

type ProductCardFooterProps = {
  price: number
  amount: number
}

export const ProductCardFooter: React.FC<ProductCardFooterProps> = ({
  price,
  amount
}) => {
  const { t } = useTranslation()

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
}
