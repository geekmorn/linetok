import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { useToggle } from 'common/hooks'
import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'
import { memo } from 'react'

type InputPasswordProps = InputProps

export const InputPassword: React.FC<InputPasswordProps> = memo(
  ({ ...inputProps }) => {
    const [showPassword, toggle] = useToggle(false)

    return (
      <InputGroup size="md">
        <Input
          placeholder={inputProps.placeholder ?? '***'}
          pr="4.5rem"
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
        />
        <InputRightElement>
          <Button mr="5px" size="sm" onClick={toggle}>
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
)

InputPassword.displayName = 'InputPassword'
