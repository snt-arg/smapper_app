import TopicWidget from '@/features/topics/components/TopicWidget'
import ServiceWidget from '@/features/services/components/ServiceWidget'
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
        <ServiceWidget />
        <TopicWidget />
      </Flex>
    </Container>
  )
}

export default DashboardPage
