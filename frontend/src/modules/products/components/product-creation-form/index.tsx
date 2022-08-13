import { useCallback, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ProductType } from 'common/types'
import { useCreateProductMutation } from 'modules/products/hooks'
import { useSnackbar } from 'notistack'
import { ProductsProps } from 'pages/admin/products'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react'

export const ProductCreationForm: React.FC<ProductsProps> = ({
  data,
  refetch
}) => {
  const uid = useId()
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState<ProductType>({
    id: uid,
    name: '',
    price: 0,
    isAvailable: true
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductType>()

  const { mutateAsync, isLoading: isMutationLoading } =
    useCreateProductMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = useCallback(
    async (payload: ProductType) => {
      await mutateAsync(payload)
      reset(formData)
      refetch()
      enqueueSnackbar('Product created.', { variant: 'success' })
    },
    [data]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: ProductType) => onSubmit(formData))}
      sx={{
        maxWidth: '250px',
        margin: '0 auto'
      }}
    >
      <FormLabel htmlFor="name">Product name</FormLabel>
      <Input
        {...register('name', {
          required: true,
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters long'
          },
          maxLength: {
            value: 20,
            message: 'Name must be at most 20 characters long'
          }
        })}
        name="name"
        id={`product_name_${uid}`}
        placeholder="Papuga"
        onChange={handleChange}
        value={formData.name}
      />
      {errors.name && <p>Name is required</p>}

      <FormLabel htmlFor="price">Price</FormLabel>
      <InputGroup>
        <InputLeftElement>$</InputLeftElement>
        <Input
          {...register('price', { required: true })}
          id={`product_price_${uid}`}
          type="number"
          placeholder="666"
          onChange={handleChange}
          value={formData.price}
        />
      </InputGroup>
      {errors.price && <p>Price is required</p>}

      <Checkbox
        {...register('isAvailable')}
        name="isAvailable"
        id={`product_isAvailable_${uid}`}
        type="checkbox"
        defaultChecked={true}
        onChange={handleChange}
        checked={formData.isAvailable}
        sx={{
          display: 'flex',
          width: '100%',
          margin: '15px 0'
        }}
      >
        Available
      </Checkbox>

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Submit
        </Button>
      </Stack>
    </FormControl>
  )
}
