import Widget from '@/shared/components/Widget' // Assuming Widget is your UI container
import { DataList } from '@chakra-ui/react' // Assume this component displays the list
import { ErrorMessage } from '@/shared/components/ErrorMessage' // The error component
import { ServiceItem } from './ServiceItem' // The service item component
import { useServices } from '@/features/services/hooks/useServices' // The custom hook for fetching services

export default function ServiceDashboard() {
  const { services, error } = useServices()

  console.log('Services:', services)

  if (error) {
    return (
      <Widget title="Services">
        <ErrorMessage message={error} />
      </Widget>
    )
  }

  return (
    <Widget title="Services">
      <DataList.Root orientation="vertical">
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </DataList.Root>
    </Widget>
  )
}
