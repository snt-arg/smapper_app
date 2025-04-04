import { Text, HStack } from "@chakra-ui/react"; // or your preferred UI library
import ServiceStatusBadge from "@/components/Service/ServiceStatusBadge"; // Assuming this is another component
import { ServiceSchema } from "@/types/Service";
import { DataList } from "@chakra-ui/react";

export const ServiceItem = ({ service }: { service: ServiceSchema }) => (
  <DataList.Item key={service.id}>
    <DataList.ItemLabel textStyle={"lg"}>{service.id}</DataList.ItemLabel>
    <DataList.ItemValue>
      <HStack justify="space-between" w="100%">
        <Text textStyle="md">{service.name}</Text>
        <ServiceStatusBadge status={service.state} />
      </HStack>
    </DataList.ItemValue>
  </DataList.Item>
);

