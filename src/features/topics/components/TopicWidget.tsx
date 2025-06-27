import Widget from '@/shared/components/Widget'
import { Table } from '@chakra-ui/react'
import { toaster } from '@/shared/components/ui/toaster'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { TopicItem } from './TopicItem'
import WidgetSkeleton from '@/shared/components/WidgetSkeleton'
import usePolling from '@/shared/hooks/usePolling'
import TopicAPI from '@/features/topics/api'
import { TopicStatus } from '@/features/topics/types/Topic'

const POLLING_INTERVAL = import.meta.env.VITE_TOPICS_POLLING_INTERVAL
  ? parseInt(import.meta.env.VITE_TOPICS_POLLING_INTERVAL as string)
  : 2000

export default function TopicWidget() {
  const {
    data: topics,
    error,
    loading,
  } = usePolling<TopicStatus[]>(TopicAPI.getTopics, POLLING_INTERVAL, true)

  if (error) {
    toaster.create({
      title: 'Error Loading Topics',
      description: error.message,
      type: 'error',
      closable: true,
    })
    return (
      <Widget title="Topics Monitor">
        <ErrorMessage message={error.message} />
      </Widget>
    )
  }

  return (
    <WidgetSkeleton loading={loading}>
      <Widget title="Topics Monitor">
          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="md">Hz</Table.ColumnHeader>
                <Table.ColumnHeader hideBelow={'md'}>Subs</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {topics?.map((topic) => (
                <TopicItem key={topic.name} service={topic} />
              ))}
            </Table.Body>
          </Table.Root>
      </Widget>
    </WidgetSkeleton>
  )
}
