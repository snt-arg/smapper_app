import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderDown, Radio, ChartLine, ServerCog } from "lucide-react";
import { JSX } from "react";
import { Button, Stack, Box, Link, Flex, Text, Center, Bleed } from "@chakra-ui/react"

export default function Sidebar() {
  return (
    <Box width={60} bgColor={"gray.100"} paddingLeft={"5"}>
      <Center marginBottom="14">
        <Text textStyle={{ base: "xl", lg: "4xl" }}>SMapper</Text>
      </Center>
      <Navigation />
    </Box >
  );
}


function Navigation() {
  const spaceX = 4;
  const iconSize = 25;
  return (
    <Stack spaceY="2">
      <NavLink to="/" end >
        {({ isActive }) => {
          return (
            <Flex spaceX={spaceX} alignItems="center" style={{ backgroundColor: "tomato" }}>
              <LayoutDashboard size={iconSize} />
              <Text textStyle="xl">Dashboard</Text>
            </Flex>)
        }}
      </NavLink>
      <NavLink to="/visualizer">
        <Flex spaceX={spaceX} alignItems="center">
          <ChartLine size={iconSize} />
          <Text textStyle="xl">Visualizer</Text>
        </Flex>
      </NavLink>
      <NavLink to="/services">
        <Flex spaceX={spaceX} alignItems="center">
          <ServerCog size={iconSize} />
          <Text textStyle="xl">Services</Text>
        </Flex>
      </NavLink>
      <NavLink to="/recordings">
        <Flex spaceX={spaceX} alignItems="center" >
          <FolderDown size={iconSize} />
          <Text textStyle="xl">Recordings</Text>
        </Flex>
      </NavLink>
      <NavLink to="/sensors">
        <Flex spaceX={spaceX} alignItems="center">
          <Radio size={iconSize} />
          <Text textStyle="xl">Sensors</Text>
        </Flex>
      </NavLink>

    </Stack>
  )
}


/**
 * Navigation links component that optionally accepts an `onClick` handler.
 *
 * @param {Object} props
 * @param {(() => void)?} [props.onClick] - Optional function to run when a link is clicked.
 * @returns {JSX.Element}
 */
export function NavLinks({ onClick }: { onClick?: () => void }): JSX.Element {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded text-xl hover:bg-blue-100 ${isActive ? "bg-blue-200 font-semibold" : ""
    }`;

  return (
    <nav className="space-y-2">
      <NavLink to="/" end className={navItemClass} onClick={onClick}>
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </NavLink>
      <NavLink to="/visualizer" className={navItemClass} onClick={onClick}>
        <ChartLine className="w-5 h-5" />
        Visualizer
      </NavLink>
      <NavLink to="/services" className={navItemClass} onClick={onClick}>
        <ServerCog className="w-5 h-5" />
        Services
      </NavLink>
      <NavLink to="/recordings" className={navItemClass} onClick={onClick}>
        <FolderDown className="w-5 h-5" />
        Recordings
      </NavLink>
      <NavLink to="/sensors" className={navItemClass} onClick={onClick}>
        <Radio className="w-5 h-5" />
        Sensors
      </NavLink>
    </nav>
  );
}

