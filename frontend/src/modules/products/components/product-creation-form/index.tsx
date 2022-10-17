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
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Select,
  Stack,
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
  } = useForm<ProductType>({
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

  return (
    <>
      <Button leftIcon={<BagPlusFill />} colorScheme="orange" onClick={onOpen}>
        Create a new product
      </Button>
      <Drawer
        isOpen={isOpen}
        size="lg"
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new product
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter a product name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="url"
                    placeholder="Please enter domain"
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select Owner</FormLabel>
                <Select id="owner" defaultValue="segun">
                  <option value="segun">Segun Adebayo</option>
                  <option value="kola">Kola Tioluwani</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" />
              </Box>
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
