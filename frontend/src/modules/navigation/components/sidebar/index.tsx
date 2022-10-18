import { List } from 'react-bootstrap-icons'
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
  Link
} from '@chakra-ui/react'

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="unstyled"
        sx={{
          display: 'grid',
          placeItems: 'center'
        }}
        _hover={{
          transform: 'rotate(90deg)'
        }}
      >
        <List fontSize="1.75rem" color="black" />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="xl" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader onClick={handleLinkClick}>
            <NextLink passHref href={HOME_ROUTE.path}>
              <Link>Linetok</Link>
            </NextLink>
          </DrawerHeader>
          <DrawerBody as={Stack} sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
            <Routes onClick={handleLinkClick} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
