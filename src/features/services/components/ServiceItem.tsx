import { Text, HStack } from '@chakra-ui/react'
import ServiceStatusBadge from '@/features/services/components/ServiceStatusBadge'
import { ServiceStatus } from '@/features/services/types/Service'
import { DataList } from '@chakra-ui/react'

export const ServiceItem = ({ service }: { service: ServiceStatus }) => (
  <DataList.Item key={service.id}>
    <DataList.ItemLabel textStyle={'lg'}>{service.id}</DataList.ItemLabel>
    <DataList.ItemValue>
      <HStack justify="space-between" w="100%">
        <Text textStyle="md">{service.name}</Text>
        <ServiceStatusBadge status={service.state} />
      </HStack>
    </DataList.ItemValue>
  </DataList.Item>
)
