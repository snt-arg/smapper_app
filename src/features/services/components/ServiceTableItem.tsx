import ServiceAPI from '@/features/services/api'
import { ServiceStatus } from '@/features/services/types/Service'
import { Table, Button, Status } from '@chakra-ui/react'
import { toaster } from '@/shared/components/ui/toaster'

const startService = (id: string) => {
  const callStartService = async () => {
    try {
      await ServiceAPI.startService(id)
    } catch (err) {
      console.error(err)
      toaster.create({
        title: 'Error Starting Service',
        description: `Failed to start service with id ${id}`,
        type: 'error',
        action: {
          label: 'X',
          onClick: () => {
            toaster.dismiss()
          },
        },
      })
    }
  }

  callStartService()
}

const stopService = (id: string) => {
  const callStopService = async () => {
    try {
      await ServiceAPI.stopService(id)
    } catch (err) {
      console.error(err)
      toaster.create({
        title: 'Error Starting Service',
        description: `Failed to start service with id ${id}`,
        type: 'error',
        action: {
          label: 'X',
          onClick: () => {
            toaster.dismiss()
          },
        },
      })
    }
  }

  callStopService()
}

function ServiceTableItem({ service }: { service: ServiceStatus }) {
  let color: string
  switch (service.state.toLowerCase()) {
    case 'active':
      color = 'green'
      break
    case 'terminated':
      color = 'yellow'
      break
    case 'failure':
      color = 'red'
      break
    default:
      color = 'gray'
      break
  }

  return (
    <Table.Row>
      <Table.Cell>{service.name}</Table.Cell>
      <Table.Cell>
        <Status.Root colorPalette={color} size="lg">
          <Status.Indicator />
          {service.state}
        </Status.Root>
      </Table.Cell>
      <Table.Cell>
        {service.state === 'Active' ? (
          <Button onClick={() => stopService(service.id)} colorPalette="red">
            Stop
          </Button>
        ) : (
          <Button onClick={() => startService(service.id)} colorPalette="green">
            Start
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default ServiceTableItem
