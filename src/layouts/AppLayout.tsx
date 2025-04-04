import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Box h="100vh" bg={{ base: "gray.200", _dark: "gray.900" }}>
      <Flex direction="column" lg={{ flexDir: "row" }}>
        <Sidebar />
        <Outlet />
      </Flex>
    </Box>
  );
}

export default AppLayout;
