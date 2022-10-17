import { useTranslation } from 'react-i18next'
import { ProductType } from 'common/types'
import { AlertButton, Card, EditableInput } from 'components'
import { Image, Stack, Text } from '@chakra-ui/react'

type ProductEventsType = {
  onClick?: () => void
  onRemove?: () => void
}

type ProductStateType = {
  loading?: boolean
}

type ProductProps = ProductType & ProductEventsType & ProductStateType

export const EditableProduct: React.FC<ProductProps> = ({
  // ProductType
  name,
  price,
  amount,
  description,
  images,
  // Props
  loading,
  onClick,
  onRemove
}) => {
  const { t } = useTranslation()

  return (
    <Card onClick={onClick}>
      <Stack sx={{ alignSelf: 'flex-end' }}>
        <AlertButton
          loading={loading}
          onYes={onRemove}
          buttonHeader="X"
          alertHeader={t('product.remove')}
          alertBody={t('cannotBeCanceled')}
        />
      </Stack>
      <EditableInput value={name} />
      <EditableInput value={description} />
      <EditableInput value={price} />
      <Text>
        {t('inStore')}:
        {amount}
        {t('quantity')}
      </Text>
      {images?.map((image, index) => (
        <Image src={image} alt="Product" key={`${index} product`} />
      ))}
    </Card>
  )
}
