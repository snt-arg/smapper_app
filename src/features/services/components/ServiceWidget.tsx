import Widget from '@/shared/components/Widget'
import { DataList } from '@chakra-ui/react'
import { toaster } from '@/shared/components/ui/toaster'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { ServiceItem } from './ServiceItem'
import WidgetSkeleton from '@/shared/components/WidgetSkeleton'
import usePolling from '@/shared/hooks/usePolling'
import { ServiceAPI } from '../api/serviceAPI'
import { ServiceStatus } from '../types/Service'

const POLLING_INTERVAL = import.meta.env.VITE_SERVICES_POLLING_INTERVAL
  ? parseInt(import.meta.env.VITE_SERVICES_POLLING_INTERVAL as string)
  : 2000

export default function ServiceWidget() {
  const {
    data: services,
    loading,
    error,
  } = usePolling<ServiceStatus[]>(
    ServiceAPI.getServices,
    POLLING_INTERVAL,
    true
  )

  if (error) {
    toaster.create({
      title: 'Error Loading Services',
      description: error.message,
      type: 'error',
      closable: true,
      action: {
        label: 'X',
        onClick: () => {
          toaster.dismiss()
        },
      },
    })

    return (
      <Widget title="Services">
        <ErrorMessage message={error.message} />
      </Widget>
    )
  }

  return (
    <WidgetSkeleton loading={loading}>
      <Widget title="Services">
        <DataList.Root orientation="vertical">
          {services?.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </DataList.Root>
      </Widget>
    </WidgetSkeleton>
  )
}
