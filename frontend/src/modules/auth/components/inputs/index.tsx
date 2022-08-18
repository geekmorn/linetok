import { EnvelopeFill, Stack } from 'react-bootstrap-icons'
import { UseFormRegister } from 'react-hook-form'
import { AuthorizationType, RegistrationType } from 'common/types'
import { InputPassword } from 'components'
import {
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'

type BaseFormBodyProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  formData: AuthorizationType
  errors: any
  register: UseFormRegister<RegistrationType>
}

export const Inputs: React.FC<BaseFormBodyProps> = ({
  handleChange,
  formData,
  errors,
  register
}) => {
  return (
    <>
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
            onChange={handleChange}
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
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </Stack>
    </>
  )
}
