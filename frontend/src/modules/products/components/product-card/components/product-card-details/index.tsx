import { useEffect, useRef } from 'react'
import useEvent from 'react-use-event-hook'
import { transform } from 'framer-motion'
import { useHover, useToggle } from 'usehooks-ts'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react'

type DetailsProps = {
  description: string
  parameters?: unknown
}

export const ProductCardDetails: React.FC<DetailsProps> = ({ description }) => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton
        sx={{
          p: '8px'
        }}
      >
        <Heading variant="h5" fontSize="0.6rem" fontWeight="800">
          FAQ
        </Heading>

        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>{description}</AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionButton
        sx={{
          p: '8px'
        }}
      >
        <Heading as="h6" fontSize="0.6rem" fontWeight="800">
          Parameters
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Text fontSize="xs">CPU: Apple M1</Text>
        <Text fontSize="xs">RAM: 8GB</Text>
        <Text fontSize="xs">Graphics: Apple M1</Text>
        <Text fontSize="xs">Screen: LED IPS Retina</Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)
