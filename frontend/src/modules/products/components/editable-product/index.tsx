import { FC, memo } from 'react'
import { useTranslation } from 'common/hooks'
import { AlertButton, Card, EditableInput } from 'components'
import { useProductContext } from 'modules/products/context'
import { Image, Stack, Text } from '@chakra-ui/react'

type ProductEventsType = {
  onClick?: () => void
  onRemove?: () => void
}

type ProductStateType = {
  loading?: boolean
}

type ProductProps = ProductEventsType & ProductStateType

export const EditableProduct: FC<ProductProps> = memo(
  ({ loading, onClick, onRemove }) => {
    const { t } = useTranslation()
    const { name, description, price, amount, images } = useProductContext()

    return (
      <Card onClick={onClick}>
        <Stack sx={{ alignSelf: 'flex-end' }}>
          <AlertButton
            loading={loading}
            onYes={onRemove}
            buttonHeader="X"
            alertHeader={t.product.remove}
            alertBody={t.cannotBeCancelled}
          />
        </Stack>
        <EditableInput value={name} />
        <EditableInput value={description} />
        <EditableInput value={price} />
        <Text>
          {t.inStore}: {amount}
          {t.quantity}
        </Text>
        {images?.map((image, index) => (
          <Image src={image} alt="Product" key={`${index} product`} />
        ))}
      </Card>
    )
  }
)

EditableProduct.displayName = 'EditableProduct'
