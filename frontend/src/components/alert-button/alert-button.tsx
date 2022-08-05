import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react'

type AlertProps = {
  buttonHeader: string | React.ReactNode
  alertHeader: string | React.ReactNode
  alertBody: string | React.ReactNode
  onYes?: () => void
}

export const AlertButton: React.FC<AlertProps> = ({
  buttonHeader,
  alertHeader,
  alertBody,
  onYes
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen}>{buttonHeader}</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{alertHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{alertBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onYes}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
