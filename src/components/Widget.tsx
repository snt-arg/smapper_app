import { Box, Stack, Text } from "@chakra-ui/react"

export default function Widget({ title, children }: { title: string, children?: React.ReactNode }) {

  return (
    <Box
      colorPalette="gray"
      bg={{ base: "colorPalette.100", _dark: "colorPalette.800" }}
      borderColor={{ base: "colorPalette.200", _dark: "colorPalette.500" }}
      borderRadius={10}
      borderWidth={2}
      w="sm"
      p="4"
    >
      <Stack w="100%" gapY={6}>
        <Text textStyle="2xl" fontWeight="semibold">{title}</Text>
        {children}
      </Stack>
    </Box>
  )

}
