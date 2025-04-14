import TopicDashboard from '@/features/topics/components/TopicDashboard'
import ServiceDashboard from '@/features/services/components'
import { Container, Flex } from '@chakra-ui/react'

function DashboardPage() {
  return (
    <Container h="100%" p="5">
      <Flex
        w="100%"
        gap={5}
        wrap="wrap"
        justify={{ base: 'center', lg: 'center' }}
      >
        <ServiceDashboard />
        <TopicDashboard />
      </Flex>
    </Container>
  )
}

export default DashboardPage
