import { FileUpload } from './components'
import { useState, useRef, FC } from 'react'
import { BagPlusFill } from 'react-bootstrap-icons'
import { ProductsProps } from 'pages/admin/products'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'

export const ProductCreationForm: FC<ProductsProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef(null)

  const format = (value: string) => `$` + value
  const parse = (value: string) => value.replace(/^\$/, '')

  const [value, setValue] = useState('1.53')

  return (
    <>
      <Button leftIcon={<BagPlusFill />} colorScheme="orange" onClick={onOpen}>
        Create a product
      </Button>
      <Drawer
        isOpen={isOpen}
        size="sm"
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a product</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormLabel
                htmlFor="name"
                fontSize="xs"
                sx={{
                  letterSpacing: '1px',
                  lineHeight: 0,
                  m: 0,
                  pt: 5,
                  textTransform: 'uppercase'
                }}
              >
                Name
              </FormLabel>
              <Input
                ref={firstField}
                id="username"
                placeholder="Please enter a product name"
              />
              <FormLabel
                htmlFor="price"
                fontSize="xs"
                sx={{
                  letterSpacing: '1px',
                  lineHeight: 0,
                  m: 0,
                  pt: 5,
                  textTransform: 'uppercase'
                }}
              >
                Price
              </FormLabel>
              <NumberInput
                onChange={(valueString) => setValue(parse(valueString))}
                value={format(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel
                htmlFor="amount"
                fontSize="xs"
                sx={{
                  letterSpacing: '1px',
                  lineHeight: 0,
                  m: 0,
                  pt: 5,
                  textTransform: 'uppercase'
                }}
              >
                Amount
              </FormLabel>
              <NumberInput value={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel
                htmlFor="description"
                fontSize="xs"
                sx={{
                  letterSpacing: '1px',
                  lineHeight: 0,
                  m: 0,
                  pt: 5,
                  textTransform: 'uppercase'
                }}
              >
                Description
              </FormLabel>
              <Textarea id="description" />
              <FileUpload />
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
