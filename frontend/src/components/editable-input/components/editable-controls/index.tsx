import { ButtonGroup, IconButton, useEditableControls } from '@chakra-ui/react'
import { Check, PencilSquare, XCircleFill } from 'react-bootstrap-icons'

export const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="Accept"
        icon={<Check />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Decline"
        icon={<XCircleFill />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <ButtonGroup justifyContent="center">
      <IconButton
        aria-label="Edit"
        size="sm"
        icon={<PencilSquare />}
        {...getEditButtonProps()}
      />
    </ButtonGroup>
  )
}
