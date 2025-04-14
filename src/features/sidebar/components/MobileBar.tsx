import { useState } from 'react'
import { Box, Text, Drawer, CloseButton, Flex, HStack } from '@chakra-ui/react'
import { Navigation, NavLink } from './Navigation.tsx'
import { ColorModeButton } from '@/shared/components/ui/color-mode.tsx'
import BurgerButton from '@/features/sidebar/components/BurgerButton.tsx'

function Mobilebar({ links }: { links: NavLink[] }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  return (
    <Drawer.Root
      size="full"
      placement="top"
      open={isSidebarOpen}
      onOpenChange={(e) => setSidebarOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Box width="100vw" height="16" bg={'bg.emphasized'}>
          <Flex
            height="100%"
            justify="space-between"
            alignItems="center"
            pl={8}
            pr={4}
          >
            <HStack>
              <Text textStyle="3xl">SMapper</Text>
            </HStack>
            <BurgerButton />
          </Flex>
        </Box>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content bgColor={'bg.emphasized'}>
          <Drawer.CloseTrigger />
          <Drawer.Header></Drawer.Header>
          <Drawer.Body mt={35}>
            <Navigation links={links} onClick={() => setSidebarOpen(false)} />
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <Flex
              width="100%"
              justify="space-between"
              alignItems="center"
              pl={8}
              pr={0}
            >
              <Text textStyle="3xl">SMapper</Text>
              <ColorModeButton />
              <CloseButton size="2xl" variant="plain" />
            </Flex>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

export default Mobilebar
