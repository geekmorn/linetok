import { useState } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'

type InputPasswordProps = InputProps

export const InputPassword: React.FC<InputPasswordProps> = ({
  ...inputProps
}) => {
  const [show, set] = useState(false)
  const handleShowPassword = () => set(!show)

  return (
    <InputGroup size="md">
      <Input
        placeholder={inputProps.placeholder ?? '***'}
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        {...inputProps}
      />
      <InputRightElement>
        <Button mr="5px" size="sm" onClick={handleShowPassword}>
          {show ? <EyeSlash /> : <Eye />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
