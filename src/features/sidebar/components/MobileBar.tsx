import { useState } from 'react'
import { Power } from 'lucide-react'
import {
  Box,
  Text,
  Drawer,
  CloseButton,
  Flex,
  HStack,
  Menu,
  Button,
  Portal,
} from '@chakra-ui/react'
import { Navigation, NavLink } from './Navigation.tsx'
import { ColorModeButton } from '@/shared/components/ui/color-mode.tsx'
import BurgerButton from '@/features/sidebar/components/BurgerButton.tsx'
import OnboardAPI from '@/features/onboard/api'

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

            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  position="absolute"
                  bottom={0}
                  right={0}
                  m="3"
                  variant="outline"
                >
                  <Power />
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="reboot"
                    onClick={() => OnboardAPI.sendRebootSignal()}
                  >
                    Reboot
                  </Menu.Item>
                  <Menu.Item
                    value="poweroff"
                    color="fg.error"
                    _hover={{ bg: 'bg.error', color: 'fg.error' }}
                    onClick={() => OnboardAPI.sendPoweroffSignal()}
                  >
                    Power off
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
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
