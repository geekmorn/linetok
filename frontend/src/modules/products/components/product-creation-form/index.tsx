import { FileUpload } from './components'
import { useId, useState, useRef } from 'react'
import { BagPlusFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import {
  ERROR_WHILE_CREATING_PRODUCT,
  SUCCESSFULLY_CREATED_PRODUCT
} from 'common/i18n'
import { ProductType } from 'common/types'
import {
  useCreateProductMutation,
  useReadProductsQuery
} from 'modules/products/hooks'
import { ProductsProps } from 'pages/admin/products'
import {
  Box,
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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

type FormDataType = ProductType

export const ProductCreationForm: React.FC<ProductsProps> = () => {
  const { t } = useTranslation()
  const uid = useId()
  const toast = useToast()

  const { refetch } = useReadProductsQuery()

  const [formData, setFormData] = useState<FormDataType>({
    amount: 0,
    description: '',
    id: uid,
    images: [],
    name: '',
    price: 0
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormDataType>({
    defaultValues: formData
  })

  const { mutateAsync, isLoading: isCreationLoading } =
    useCreateProductMutation()

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const onSubmit = useEvent((formData: FormDataType) => async () => {
    await mutateAsync(formData, {
      onError: () => {
        toast(ERROR_WHILE_CREATING_PRODUCT)
      },
      onSuccess: () => {
        refetch()
        reset()
        toast(SUCCESSFULLY_CREATED_PRODUCT)
      }
    })
  })

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
              <NumberInput value={formData.amount}>
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
