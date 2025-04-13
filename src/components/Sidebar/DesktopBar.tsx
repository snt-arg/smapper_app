import { Box, Text } from '@chakra-ui/react'
import { Navigation, NavLink } from './Navigation.tsx'
import { ColorModeButton } from '../ui/color-mode.tsx'

const DesktopBar = ({ links }: { links: NavLink[] }) => {
  return (
    <>
      <Box
        colorPalette="gray"
        position="sticky"
        left={0}
        p={5}
        minW="15em"
        top={0}
        h="100vh"
        bgColor={'bg.emphasized'}
      >
        <Text fontWeight="bold" textStyle="4xl" textAlign="center" mb="5">
          SMapper
        </Text>
        <Box
          borderBottom={2}
          borderColor={'bg.inverted'}
          borderWidth={2}
          mb="5"
        />
        <Navigation links={links} />
        <ColorModeButton position="absolute" bottom={0} left={0} m="3" />
      </Box>
    </>
  )
}

export default DesktopBar
