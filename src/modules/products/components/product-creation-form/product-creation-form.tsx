import { useCallback, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IProduct } from 'common/interfaces'
import {
  useAddProductMutation,
  useGetProductsQuery
} from 'modules/products/hooks'

export const ProductCreationForm: React.FC = () => {
  const uid = useId()

  const [formData, setFormData] = useState<IProduct>({ id: uid } as IProduct)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: formData
  })

  const { data: products, refetch: productsRefetch } = useGetProductsQuery()
  const { mutateAsync, isLoading: isMutationLoading } = useAddProductMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = useCallback(
    async (data: IProduct) => {
      await mutateAsync(data)
      reset()
      productsRefetch()
      alert('Product added successfully!')
    },
    [products]
  )

  const onError = useCallback((error: typeof errors) => {
    console.error(error)
  }, [])

  return (
    <form
      onSubmit={handleSubmit(
        (formData) => onSubmit(formData as IProduct),
        onError
      )}
    >
      <label htmlFor="name">Product name</label>
      <input
        {...register('name', { required: true })}
        name="name"
        id="name"
        placeholder="Papuga!"
        onChange={handleChange}
        value={formData.name}
      />
      <label htmlFor="price">Price</label>
      <input
        {...register('price', { required: true })}
        name="price"
        id="price"
        type="number"
        placeholder="$6"
        onChange={handleChange}
        value={formData.price}
      />

      <label htmlFor="isAvailable">Is product available?</label>
      <input
        {...register('isAvailable')}
        id="isAvailable"
        type="checkbox"
        placeholder="true"
        onChange={handleChange}
      />

      <button type="submit" disabled={isMutationLoading}>
        Submit
      </button>

      {errors.name && <p>Name is required</p>}
      {errors.price && <p>Price is required</p>}
      {errors.isAvailable && <p>Is Available is required</p>}
    </form>
  )
}
