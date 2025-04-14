import { Box, Stack, Text } from '@chakra-ui/react'

export default function Widget({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <Box
      bg={'bg.emphasized'}
      borderColor={{ base: 'colorPalette.500', _dark: 'colorPalette.500' }}
      rounded="lg"
      borderWidth={1}
      minW="20rem"
      w={{ base: '100%', sm: 'sm', md: 'md' }}
      p="4"
      shadow="inner"
    >
      <Stack w="100%" gapY={6}>
        <Text textStyle="2xl" fontWeight="semibold">
          {title}
        </Text>
        {children}
      </Stack>
    </Box>
  )
}
