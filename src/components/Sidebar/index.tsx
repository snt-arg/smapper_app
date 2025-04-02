import { useState } from "react";
import { Navigation, NavLink } from "./Navigation.tsx"
import { ChartLine, FolderDown, LayoutDashboard, Menu, Radio, ServerCog } from "lucide-react";
import { Box, useBreakpointValue, Text, Drawer, Button, Portal, CloseButton, Flex, IconButton } from "@chakra-ui/react";
import Header from "@/components/Header";
import BurgerButton from "../BurgerButton.tsx";


const links: NavLink[] = [
  {
    href: "/",
    icon: LayoutDashboard,
    text: "Dashboard"
  },
  {
    href: "/visualizer",
    icon: ChartLine,
    text: "Visualizer"
  },
  {
    href: "/services",
    icon: ServerCog,
    text: "Services"
  },

  {
    href: "/recordings",
    icon: FolderDown,
    text: "Data Collection"
  },
  {
    href: "/sensors",
    icon: Radio,
    text: "Sensors"
  },
]

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }


const DesktopBar = () => {
  return (
    <>
      <Box
        left={0}
        p={5}
        w="65"
        top={0}
        h="100vh"
        bgColor="gray.100">
        <Text
          textStyle="4xl"
          textAlign="center"
          mb="5">SMapper</Text>
        <Box borderBottom={2} borderColor="black" borderWidth={2} mb="5" />
        <Navigation links={links} />
      </Box>
    </>
  );
}

function Mobilebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Drawer.Root
      size="full"
      placement="top"
      open={isSidebarOpen}
      onOpenChange={(e) => setSidebarOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Box
          width="100vw"
          height="16"
          bgColor="gray.100"
        >
          <Flex
            height="100%"
            justify="space-between"
            alignItems="center"
            pl={8}
            pr={4}
          >
            <Text textStyle="3xl">SMapper</Text>
            <BurgerButton color="black" />
          </Flex>
        </Box>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content bgColor="gray.100">
          <Drawer.CloseTrigger />
          <Drawer.Header>
          </Drawer.Header>
          <Drawer.Body mt={35}>
            <Navigation links={links} onClick={() => setSidebarOpen(false)} />
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <Flex width="100%" justify="space-between" alignItems="center" pl={8} pr={0}>
              <Text textStyle="3xl">SMapper</Text>
              <CloseButton size="2xl" variant="plain" />
            </Flex>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

function Sidebar() {
  const variants = useBreakpointValue({ base: smVariant, lg: mdVariant })

  return variants?.navigation === "sidebar" ? (
    <DesktopBar />
  ) : <Mobilebar />

}

export default Sidebar;
