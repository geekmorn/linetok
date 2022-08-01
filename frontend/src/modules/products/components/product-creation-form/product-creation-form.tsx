import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IProduct } from 'common/interfaces'
import {
  useAddProductMutation,
  useGetProductsQuery
} from 'modules/products/hooks'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useId
} from '@chakra-ui/react'

export const ProductCreationForm: React.FC = () => {
  const uid = useId()

  const [formData, setFormData] = useState<IProduct>({
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
  } = useForm<IProduct>()

  const { data: products, refetch } = useGetProductsQuery()
  const { mutateAsync, isLoading: isMutationLoading } = useAddProductMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = useCallback(
    async (payload: IProduct) => {
      await mutateAsync(payload)
      reset()
      refetch()
      alert('Product added successfully!')
    },
    [products]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
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
        id={`product--${uid}--name`}
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
          id={`product--${uid}--price`}
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
        id={`product--${uid}--isAvailable`}
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