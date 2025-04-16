import Widget from '@/shared/components/Widget'
import { DataList } from '@chakra-ui/react'
import { toaster } from '@/shared/components/ui/toaster'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { ServiceItem } from './ServiceItem'
import { useServices } from '@/features/services/hooks/useServices'
import WidgetSkeleton from '@/shared/components/WidgetSkeleton'

export default function ServiceWidget() {
  const { services, error, loading } = useServices()

  if (error) {
    toaster.create({
      title: 'Error Loading Services',
      description: error,
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
        <ErrorMessage message={error} />
      </Widget>
    )
  }

  return (
    <WidgetSkeleton loading={loading}>
      <Widget title="Services">
        <DataList.Root orientation="vertical">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </DataList.Root>
      </Widget>
    </WidgetSkeleton>
  )
}
