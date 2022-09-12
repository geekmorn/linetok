import { Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type LabelProps = PropsWithChildren & {
  text: string
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return <Text sx={{ color: 'white' }}>{text}</Text>
}
