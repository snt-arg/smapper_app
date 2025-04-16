import { Box, Skeleton, Stack } from '@chakra-ui/react'

export default function WidgetSkeleton({
  loading = true,
  children,
}: {
  loading?: boolean
  children?: React.ReactNode
}) {
  return (
    <>
      {loading ? (
        <Box
          minW="20rem"
          w={{ base: '100%', sm: 'sm', md: 'md' }}
          borderColor={{ base: 'colorPalette.500', _dark: 'colorPalette.500' }}
          rounded="lg"
          borderWidth={1}
        >
          <Stack w="100%" gapY={6} p="4">
            <Skeleton w="50%" h="30px" loading={loading} />
            <Skeleton h="sm" loading={loading} />
          </Stack>
        </Box>
      ) : (
        children
      )}
    </>
  )
}
