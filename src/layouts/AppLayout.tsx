import Sidebar from '@/components/Sidebar'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <Box minH="100vh" h="100%" bg={'bg'}>
      <Flex direction="column" lg={{ flexDir: 'row' }}>
        <Sidebar />
        <Outlet />
      </Flex>
    </Box>
  )
}

export default AppLayout
