import { useTranslation } from 'common/hooks'
import { Routes } from 'modules'
import NextLink from 'next/link'
import { Heading, Link, Stack, Text, Image } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack
      as="footer"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'space-evenly',
        minHeight: '40vh',
        p: '2rem',
        width: '100%'
      }}
    >
      <Stack
        direction="row"
        _hover={{
          opacity: 1
        }}
        sx={{
          opacity: 0.8,
          textTransform: 'uppercase',
          transition: '0.5s ease all'
        }}
      >
        <Routes />
      </Stack>
      <Heading
        as="h3"
        fontSize={64}
        _hover={{
          opacity: 1
        }}
        sx={{
          opacity: 0.8,
          transition: '.5s ease-out all'
        }}
      >
        {t.Linetok}
      </Heading>
      <Stack direction="row" gap={5}>
        <Text
          _hover={{
            opacity: 1
          }}
          sx={{
            opacity: 0.8,
            transition: '0.5s ease-out all'
          }}
        >
          &copy; {new Date().getFullYear()} linetok.com
        </Text>
        <NextLink passHref href="#">
          <Link
            isExternal
            _hover={{
              opacity: 1,
              textDecoration: 'wavy underline orange 2px'
            }}
            sx={{
              opacity: 0.8,
              textDecoration: 'wavy underline orange 2px',
              textUnderlineOffset: '10px',
              transition: '0.5s opacity ease-out'
            }}
          >
            Public Offering
          </Link>
        </NextLink>
      </Stack>
      <Text
        fontSize="xs"
        _hover={{
          opacity: 1
        }}
        sx={{
          maxWidth: '70px',
          opacity: 0.8,
          position: 'relative',
          transition: '0.5s ease-out all'
        }}
      >
        Designed in 🇵🇱 by 🇺🇦 and
        <Image
          alt="Belarusian"
          src="/Belarus.png"
          boxSize="1.5rem"
          sx={{
            bottom: '-3px',
            lineHeight: 0,
            m: 0,
            p: 0,
            position: 'absolute',
            right: -5
          }}
        />
      </Text>
    </Stack>
  )
}
