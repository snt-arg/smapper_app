import { Box, Button, Text, Portal, Menu } from '@chakra-ui/react'
import { Power } from 'lucide-react'
import {
  Navigation,
  NavLink,
} from '@/features/sidebar/components/Navigation.tsx'
import { ColorModeButton } from '@/shared/components/ui/color-mode.tsx'
import OnboardAPI from '@/features/onboard/api'

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
          <Portal>
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
          </Portal>
        </Menu.Root>
      </Box>
    </>
  )
}

export default DesktopBar
