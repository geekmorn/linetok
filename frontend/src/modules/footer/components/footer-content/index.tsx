import { FC } from 'react'
import { useTranslation } from 'common/hooks'
import NextLink from 'next/link'
import { Heading, Stack, Link, Text } from '@chakra-ui/react'

export const FooterContent: FC = () => {
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}
