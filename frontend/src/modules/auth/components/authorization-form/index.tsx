import { useCallback, useState } from 'react'
import { EnvelopeFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { SignInType } from 'common/types'
import { InputPassword } from 'components'
import { useAuthorizeMutation } from 'modules/auth/hooks'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react'

export const AuthorizationForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInType>({
    email: '',
    password: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignInType>()

  const { mutateAsync, isLoading: isMutationLoading } = useAuthorizeMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = useCallback(
    async (payload: SignInType) => {
      await mutateAsync(payload)
      reset()
    },
    [mutateAsync, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: SignInType) => onSubmit(formData))}
      sx={{
        width: '275px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <Heading>Авторизация</Heading>
      <FormLabel htmlFor="email">Почта</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EnvelopeFill color="gray.300" />
        </InputLeftElement>
        <Input
          id="email"
          placeholder="example@email.com"
          {...register('email', {
            value: formData.email,
            onChange: handleChange,
            required: true,
            minLength: {
              value: 3,
              message: 'Email must be at least 3 characters long'
            },
            maxLength: {
              value: 20,
              message: 'Email must be at most 20 characters long'
            }
          })}
        />
        {errors.email && <small>{errors.email.message}</small>}
      </InputGroup>

      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputPassword
        {...register('password', {
          value: formData.password,
          onChange: handleChange,
          required: true,
          minLength: {
            value: 3,
            message: 'Password must be at least 8 characters long'
          }
        })}
      />
      {errors.password && <small>{errors.password.message}</small>}

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Войти
        </Button>
      </Stack>
    </FormControl>
  )
}
