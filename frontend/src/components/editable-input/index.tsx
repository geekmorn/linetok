import {
  EditableInput as ChakraEditableInput,
  Editable,
  EditablePreview,
  Input,
  Stack
} from '@chakra-ui/react'
import { EditableControls } from './components/editable-controls'

type EditableInputProps = {
  value: string | number
}

export const EditableInput: React.FC<EditableInputProps> = ({ value }) => (
  <Editable textAlign="center" value={value as string}>
    <Stack
      sx={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'space-between'
      }}
    >
      <EditablePreview />

      <Input as={ChakraEditableInput} />
      <EditableControls />
    </Stack>
  </Editable>
)
