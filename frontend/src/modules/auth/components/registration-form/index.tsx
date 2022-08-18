import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { RegistrationType } from 'common/types'
import { Inputs } from 'modules/auth'
import { useRegisterMutation } from 'modules/auth/hooks'
import { Button, FormControl, Heading, Stack } from '@chakra-ui/react'

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationType>({
    email: '',
    password: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegistrationType>()

  const { mutateAsync, isLoading: isMutationLoading } = useRegisterMutation()

  const handleChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const onSubmit = useCallback(
    async (payload: RegistrationType) => {
      await mutateAsync(payload)
      reset()
    },
    [mutateAsync, reset]
  )

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit((formData: RegistrationType) =>
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
      <Heading>Регистрация</Heading>

      <Inputs
        handleChange={handleChange}
        formData={formData}
        errors={errors}
        register={register}
      />

      <Stack>
        <Button type="submit" disabled={isMutationLoading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </FormControl>
  )
}
