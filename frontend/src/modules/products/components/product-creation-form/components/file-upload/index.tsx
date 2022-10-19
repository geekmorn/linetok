import useEvent from 'react-use-event-hook'
import { motion, useAnimation } from 'framer-motion'
import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'

const first = {
  hover: {
    filter: 'grayscale(0%)',
    rotate: '-20deg',
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: 'tween'
    },
    x: '-70%'
  },
  rest: {
    filter: 'grayscale(80%)',
    rotate: '-15deg',
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
      type: 'tween'
    },
    x: '-50%'
  }
}

const second = {
  hover: {
    filter: 'grayscale(0%)',
    rotate: '20deg',
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: 'tween'
    },
    x: '70%'
  },
  rest: {
    filter: 'grayscale(80%)',
    rotate: '15deg',
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
      type: 'tween'
    },
    x: '50%'
  }
}

const third = {
  hover: {
    filter: 'grayscale(0%)',
    scale: 1.3,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: 'tween'
    }
  },
  rest: {
    filter: 'grayscale(80%)',
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
      type: 'tween'
    }
  }
}

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => (
  <Box
    bg="white"
    top="0"
    height="100%"
    width="100%"
    position="absolute"
    borderWidth="1px"
    borderStyle="solid"
    rounded="sm"
    borderColor="gray.400"
    as={motion.div}
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
    {...props}
    ref={ref}
  />
))

export const FileUpload: React.FC = () => {
  const controls = useAnimation()
  const startAnimation = useEvent(() => controls.start('hover'))
  const stopAnimation = useEvent(() => controls.stop())

  return (
    <AspectRatio ratio={1}>
      <Stack
        maxH="200px"
        rounded="md"
        role="group"
        sx={{
          border: '3px dashed #f1f1f1'
        }}
        as={motion.div}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Stack
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justify="center"
        >
          <Box height="16" width="12" position="relative">
            <PreviewImage
              sx={{
                border: 'none'
              }}
              variants={first}
              backgroundImage="url('https://media.owcnow.com/image/upload/w_400,f_auto,q_auto,dpr_3.0/rover-wheels-trimmed')"
            />
            <PreviewImage
              sx={{
                border: 'none'
              }}
              variants={second}
              backgroundImage="url('https://media.croma.com/image/upload/v1664415333/Croma%20Assets/Entertainment/Television/Images/244467_0_tgmlr9.png')"
            />
            <PreviewImage
              sx={{
                border: 'none'
              }}
              variants={third}
              backgroundImage={`url("https://delkom.pl/pic/3302/333397/xps-17-9720-srebrny-widok-klawiatury-png-720x.png")`}
            />
          </Box>
          <Stack p="1" textAlign="center">
            <Heading fontSize="lg">Drop images here</Heading>
            <Text fontWeight="light">or click to upload</Text>
          </Stack>
        </Stack>
        <Input
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept="image/*"
          onDragEnter={startAnimation}
          onDragLeave={stopAnimation}
        />
      </Stack>
    </AspectRatio>
  )
}
