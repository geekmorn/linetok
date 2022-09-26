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
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { ProductType } from 'common/types'
import {
  useCreateProductMutation,
  useReadProductsQuery
} from 'modules/products/hooks'
import { ProductsProps } from 'pages/admin/products'

type FormDataType = ProductType

export const ProductCreationForm: React.FC<ProductsProps> = () => {
  const uid = useId()
  const toast = useToast()

  const { refetch } = useReadProductsQuery({})

  const [formData, setFormData] = useState<FormDataType>({
    amount: 0,
    description: '',
    id: uid,
    images: [],
    name: '',
    price: 0
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
      onError: () => {
        toast({
          description:
            'Something went wrong when we tried to create the product.',
          isClosable: false,
          status: 'error',
          title: 'Creation failed'
        })
      },
      onSuccess: () => {
        refetch()
        reset()
        toast({
          description: "We've just created the product for you.",
          isClosable: true,
          status: 'success',
          title: 'Product created'
        })
      }
    })
  })

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
      sx={{
        margin: '0 auto',
        maxWidth: '250px'
      }}
    >
      <FormLabel htmlFor="name">Product name</FormLabel>
      <Input
        {...register('name', {
          maxLength: {
            message: 'Name must be at most 20 characters long',
            value: 20
          },
          minLength: {
            message: 'Name must be at least 3 characters long',
            value: 3
          },
          required: true
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
          margin: '15px 0',
          width: '100%'
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
