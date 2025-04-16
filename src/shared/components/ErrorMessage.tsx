import { Box, Heading, Text, Stack, HStack } from '@chakra-ui/react'
import { OctagonX } from 'lucide-react'

export const ErrorMessage = ({ message }: { message: string }) => (
  <Box bg="bg.error" p={4} borderRadius="md" mb={4}>
    <Stack mb={2}>
      <HStack alignItems="middle">
        <OctagonX size="20" color="red" />
        <Heading size="md">Error</Heading>
      </HStack>
      <Text>{message}</Text>
    </Stack>
  </Box>
)
