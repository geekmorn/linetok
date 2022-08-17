import { useCallback, useState } from 'react'
import { EnvelopeFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { SignUpType } from 'common/types'
import { InputPassword } from 'components'
import { useCreateUserMutation } from 'modules/auth/hooks'
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

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpType>({
    email: '',
    password: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignUpType>()

  const { mutateAsync, isLoading: isMutationLoading } = useCreateUserMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = useCallback(
    async (payload: SignUpType) => {
      await mutateAsync(payload)
      reset()
    },
    [mutateAsync, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: SignUpType) => onSubmit(formData))}
      sx={{
        width: '275px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <Heading>Регистрация</Heading>
      <FormLabel htmlFor="email">Почта</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EnvelopeFill color="gray.300" />
        </InputLeftElement>
        <Input
          {...register('email', {
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
          id="email"
          name="email"
          placeholder="example@email.com"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <small>{errors.email.message}</small>}
      </InputGroup>

      <FormLabel htmlFor="password">Пароль</FormLabel>
      <InputPassword
        {...register('password', {
          required: true,
          minLength: {
            value: 3,
            message: 'Password must be at least 8 characters long'
          }
        })}
        id="password"
        name="password"
        placeholder="***"
        onChange={handleChange}
        value={formData.password}
      />
      {errors.password && <small>{errors.password.message}</small>}

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </FormControl>
  )
}
