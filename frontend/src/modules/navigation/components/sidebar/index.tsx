import { List } from 'react-bootstrap-icons'
import { routes } from 'modules'
import Link from 'next/link'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack
} from '@chakra-ui/react'

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  return (
    <>
      <Button onClick={handleClick} variant="unstyled">
        <List fontSize="1.5rem" color="black" />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="xl" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Linetok</DrawerHeader>
          <DrawerBody as={Stack} sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
            {routes.map((route) => (
              <Link key={route.path} href={route.path}>
                {route.name}
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
