import { List } from 'react-bootstrap-icons'
import useEvent from 'react-use-event-hook'
import { HOME_ROUTE, Routes } from 'modules'
import NextLink from 'next/link'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Link,
  IconButton
} from '@chakra-ui/react'

export const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = useEvent(() => {
    onOpen()
  })

  const onChangeRoute = useEvent(() => {
    onClose()
  })

  return (
    <>
      <IconButton
        aria-label="Menu"
        onClick={onClick}
        variant="unstyled"
        sx={{
          display: 'grid',
          placeItems: 'center'
        }}
        _hover={{
          transform: 'rotate(90deg)'
        }}
      >
        <List fontSize="1.6rem" color="black" />
      </IconButton>
      <Drawer onClose={onClose} isOpen={isOpen} size="xl" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader onClick={onChangeRoute}>
            <NextLink passHref href={HOME_ROUTE.path}>
              <Link>Linetok</Link>
            </NextLink>
          </DrawerHeader>
          <DrawerBody as={Stack} sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
            <Routes onClick={onChangeRoute} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
