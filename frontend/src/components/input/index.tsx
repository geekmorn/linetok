import { useState } from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react'

type InputProps = ChakraInputProps & {
  label: string
}

export const Input: React.FC<InputProps> = ({ label, type, placeholder }) => {
  const [value, setValue] = useState('')

  const handleInputChange = (e: any) => setValue(e.target.value)

  const isError = value === ''

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isError && <FormErrorMessage>{label} is required.</FormErrorMessage>}
    </FormControl>
  )
}
