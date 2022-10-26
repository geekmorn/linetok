import { FC } from 'react'
import { PersonCircle } from 'react-bootstrap-icons'
import { useLanguage } from 'common/hooks'
import Link from 'next/link'
import {
  Select,
  IconButton,
  Button,
  useColorMode,
  Stack,
  Text
} from '@chakra-ui/react'

export const UserPanel: FC = () => {
  const [currentLanguage, changeLanguage] = useLanguage()
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Stack
      direction="row"
      gap={3}
      sx={{
        placeItems: 'center'
      }}
    >
      <Select
        onChange={changeLanguage}
        value={currentLanguage}
        borderColor="transparent"
        sx={{
          border: 'none'
        }}
      >
        <option value="en-US">🇺🇸</option>
        <option value="by-BY">❤️</option>
      </Select>
      <Stack
        direction="row"
        sx={{
          color: 'black'
        }}
      >
        <IconButton
          background={colorMode === 'dark' ? 'black' : 'white'}
          border={colorMode === 'dark' ? '2px solid black' : '2px solid black'}
          aria-label="Toggle theme"
          rounded="full"
          size="xs"
          onClick={toggleColorMode}
        />
        <Text>{colorMode === 'dark' ? 'Dark' : 'Bright'}</Text>
      </Stack>
      <Link href="/login">
        <Button variant="link">
          <PersonCircle fontSize="1.5rem" color="black" />
        </Button>
      </Link>
    </Stack>
  )
}
