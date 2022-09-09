import { useCallback, useState } from 'react'
import { EnvelopeFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { AuthType } from 'common/types'
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

type AuthFormProps = {
  isRegistrationMode: boolean
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isRegistrationMode = false
}) => {
  const [formData, setFormData] = useState<AuthType>({
    email: '',
    password: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthType>()

  const { mutateAsync, isLoading: isMutationLoading } = useAuthorizeMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const onSubmit = useCallback(
    async (payload: AuthType) => {
      await mutateAsync(payload)
      reset()
      return
    },
    [mutateAsync, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: AuthType) => onSubmit(formData))}
      sx={{
        width: '275px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
      }}
    >
      <Heading>{isRegistrationMode ? 'Регистрация' : 'Авторизация'}</Heading>

      <Stack>
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
            onChange={onChange}
            value={formData.email}
          />
          {errors.email && <small>{errors.email.message}</small>}
        </InputGroup>
      </Stack>

      <Stack>
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
          onChange={onChange}
          value={formData.password}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </Stack>

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Войти
        </Button>
      </Stack>
    </FormControl>
  )
}
