import { Skeleton, Table } from '@chakra-ui/react'
import { useServices } from '../hooks/useServices'
import { toaster } from '@/shared/components/ui/toaster'
import ServiceTableItem from './ServiceTableItem'
import { ErrorMessage } from '@/shared/components/ErrorMessage'

function ServicesControl() {
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
    return <ErrorMessage message={error} />
  }

  return (
    <Skeleton loading={loading} divideY="2px" h="50%">
      <Table.Root variant="outline" interactive>
        <Table.ColumnGroup>
          <Table.Column htmlWidth="50%" />
          <Table.Column htmlWidth="40%" />
          <Table.Column />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Service Name</Table.ColumnHeader>
            <Table.ColumnHeader>Service State</Table.ColumnHeader>
            <Table.ColumnHeader>Service Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {services.map((service) => (
            <ServiceTableItem service={service} key={service.id} />
          ))}
        </Table.Body>
      </Table.Root>
    </Skeleton>
  )
}

export default ServicesControl
