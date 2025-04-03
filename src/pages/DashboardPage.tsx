import ServiceDashboard from "@/components/Service";
import { Container, Flex } from "@chakra-ui/react";

function DashboardPage() {
  return (
    <Container h="100%" p="5">
      <Flex w="100%" gap={10} wrap="wrap" justify={{ base: "center", lg: "left" }}>
        <ServiceDashboard />
        <ServiceDashboard />
      </Flex>
    </Container>
  )
}

export default DashboardPage;
