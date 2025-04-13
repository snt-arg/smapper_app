import RosbagList from '@/components/Rosbags/RosbagList'
import { Box } from '@chakra-ui/react'

function RecordingsPage() {
  return (
    <Box h="100%" p="5" w="100%">
      <RosbagList />
    </Box>
  )
}

export default RecordingsPage
