import { Heading, Button, Stack, Highlight, Divider } from '@chakra-ui/react'

export const Banner: React.FC = () => (
  <Stack
    direction="row"
    sx={{
      alignItems: 'center',
      background: 'black',
      borderRadius: '10px',
      color: 'white',
      justifyContent: 'space-between',
      minH: '25vh',
      p: '0 5%',
      width: '100%'
    }}
  >
    <Heading as="h1">
      <Highlight query="10%" styles={{ bg: 'orange.100' }}>
        Get a 10% discount for the next purchase
      </Highlight>
    </Heading>
    <Button variant="ghost">See more</Button>
  </Stack>
)
