import {
  EditableInput as ChakraEditableInput,
  Editable,
  EditablePreview,
  Input,
  Stack
} from '@chakra-ui/react'
import { EditableControls } from './components'

type EditableInputProps = {
  value: string | number
}

export const EditableInput: React.FC<EditableInputProps> = ({ value }) => (
  <Editable textAlign="center" value={value as string}>
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3
      }}
    >
      <EditablePreview />

      <Input as={ChakraEditableInput} />
      <EditableControls />
    </Stack>
  </Editable>
)
