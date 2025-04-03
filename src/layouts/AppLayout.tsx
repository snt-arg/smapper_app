import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Flex direction="column" lg={{ flexDir: "row", flex: 1 }}>
      <Sidebar />
      <Box flex={5} p="4">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AppLayout;
