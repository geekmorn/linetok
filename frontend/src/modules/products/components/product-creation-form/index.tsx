import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { ProductType } from 'common/types'
import {
  useCreateProductMutation,
  useReadProductsQuery
} from 'modules/products/hooks'
import { ProductsProps } from 'pages/admin/products'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast
} from '@chakra-ui/react'

type FormDataType = ProductType

export const ProductCreationForm: React.FC<ProductsProps> = () => {
  const uid = useId()
  const toast = useToast()

  const { refetch } = useReadProductsQuery({})

  const [formData, setFormData] = useState<FormDataType>({
    id: uid,
    name: '',
    price: 0,
    amount: 0,
    description: '',
    images: []
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductType>({
    defaultValues: formData
  })

  const { mutateAsync, isLoading: isCreationLoading } =
    useCreateProductMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const onSubmit = useEvent((formData: FormDataType) => async () => {
    await mutateAsync(formData, {
      onSuccess: () => {
        refetch()
        reset()
        toast({
          title: 'Product created',
          description: "We've just created the product for you.",
          status: 'success',
          isClosable: true
        })
      },
      onError: () => {
        toast({
          title: 'Creation failed',
          description:
            'Something went wrong when we tried to create the product.',
          status: 'error',
          isClosable: false
        })
      }
    })
  })

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
        id={`product_name_${uid}`}
        placeholder="Papuga"
        onChange={onChange}
        value={formData.name}
      />
      {errors.name && <p>Name is required</p>}

      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        {...register('description')}
        name="description"
        id={`product_description_${uid}`}
        placeholder="Apple is a fruit."
        onChange={onChange}
        value={formData.description}
      />
      {errors.description && <p>Description is required</p>}

      <FormLabel htmlFor="price">Price</FormLabel>
      <InputGroup>
        <InputLeftElement>$</InputLeftElement>
        <Input
          {...register('price', { required: true })}
          id={`product_price_${uid}`}
          type="number"
          placeholder="666"
          onChange={onChange}
          value={formData.price}
        />
      </InputGroup>
      {errors.price && <p>Price is required</p>}

      <FormLabel htmlFor="price">Amount</FormLabel>
      <Input
        {...register('amount')}
        name="amount"
        id={`product_amount_${uid}`}
        type="number"
        onChange={onChange}
        sx={{
          display: 'flex',
          width: '100%',
          margin: '15px 0'
        }}
      />

      <Stack>
        <Button type="submit" disabled={isCreationLoading}>
          Submit
        </Button>
      </Stack>
    </FormControl>
  )
}
