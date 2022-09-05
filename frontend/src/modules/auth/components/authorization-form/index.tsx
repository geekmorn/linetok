import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { AuthorizationType } from 'common/types'
import { Inputs } from 'modules/auth'
import { useAuthorizeMutation } from 'modules/auth/hooks'
import { Button, FormControl, Heading, Stack } from '@chakra-ui/react'

export const AuthorizationForm: React.FC = () => {
  const [formData, setFormData] = useState<AuthorizationType>({
    email: '',
    password: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthorizationType>()

  const { mutateAsync, isLoading: isMutationLoading } = useAuthorizeMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const onSubmit = useCallback(
    async (payload: AuthorizationType) => {
      await mutateAsync(payload)
      reset()
      return
    },
    [mutateAsync, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: AuthorizationType) =>
        onSubmit(formData)
      )}
      sx={{
        width: '275px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
      }}
    >
      <Heading>Авторизация</Heading>

      <Inputs
        handleChange={onChange}
        formData={formData}
        errors={errors}
        register={register}
      />

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Войти
        </Button>
      </Stack>
    </FormControl>
  )
}
