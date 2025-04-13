import RosbagList from '@/components/Rosbags/RosbagList'
import { Container, Flex } from '@chakra-ui/react'

function RecordingsPage() {
  return (
    <Container h="100%" p="5">
      <Flex
        w="100%"
        gap={5}
        wrap="wrap"
        justify={{ base: 'center', lg: 'center' }}
      >
        <RosbagList />
      </Flex>
    </Container>
  )
}

export default RecordingsPage
