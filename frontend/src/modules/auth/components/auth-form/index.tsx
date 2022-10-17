import { useState } from 'react'
import { EnvelopeFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { AuthType } from 'common/types'
import { InputPassword } from 'components'
import { WebAuthn } from 'modules'
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

export const AuthForm: React.FC<AuthFormProps> = ({ isRegistrationMode }) => {
  const [formData, setFormData] = useState<AuthType>({
    email: '',
    password: ''
  })

  const { register, handleSubmit, reset } = useForm<AuthType>({
    defaultValues: formData
  })

  const { mutateAsync, isLoading: isMutationLoading } = useAuthorizeMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const onSubmit = useEvent(async (payload: AuthType) => {
    await mutateAsync(payload)
    reset()
  })

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        margin: '0 auto',
        maxWidth: '400px'
      }}
    >
      <Heading>{isRegistrationMode ? 'Зарэгістравацца' : 'Увайсці'}</Heading>

      <Stack>
        <FormLabel htmlFor="email">Пошта</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EnvelopeFill color="gray.300" />
          </InputLeftElement>
          <Input
            {...register('email', {
              maxLength: {
                message:
                  'Даўжыня электроннай пошты павінна быць не больш за 20 сімвалаў',
                value: 20
              },
              minLength: {
                message:
                  'Даўжыня электроннай пошты павінна быць не менш за 3 сімвалы',
                value: 3
              },
              required: true
            })}
            id="email"
            name="email"
            placeholder="example@email.com"
            onChange={onChange}
            value={formData.email}
          />
        </InputGroup>
      </Stack>

      <Stack>
        <FormLabel htmlFor="password">Пароль</FormLabel>
        <InputPassword
          {...register('password', {
            minLength: {
              message: 'Пароль павінен быць не менш за 8 сімвалаў',
              value: 3
            },
            required: true
          })}
          id="password"
          name="password"
          onChange={onChange}
          value={formData.password}
        />
      </Stack>

      {isRegistrationMode && (
        <Stack>
          <FormLabel htmlFor="passwordConfirm">Пацвярджэнне</FormLabel>
          <InputPassword
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={onChange}
          />
        </Stack>
      )}

      <Stack
        sx={{
          flexDirection: 'row',
          gap: '5px',
          placeItems: 'center',
          width: '100%'
        }}
      >
        <Button
          variant="solid"
          type="submit"
          h="50px"
          w="100%"
          disabled={isMutationLoading}
        >
          {isRegistrationMode ? 'Зарэгістравацца' : 'Увайсці'}
        </Button>
        <WebAuthn isRegistrationMode={isRegistrationMode} />
      </Stack>
    </FormControl>
  )
}
