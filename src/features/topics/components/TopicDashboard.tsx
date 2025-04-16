import Widget from '@/shared/components/Widget'
import { Table } from '@chakra-ui/react'
import { toaster } from '@/shared/components/ui/toaster'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { useTopics } from '@/features/topics/hooks/useTopics'
import { TopicItem } from './TopicItem'
import WidgetSkeleton from '@/shared/components/WidgetSkeleton'

export default function TopicWidget() {
  const { topics, error, loading } = useTopics()

  if (error) {
    toaster.create({
      title: 'Error Loading Topics',
      description: error,
      type: 'error',
      closable: true,
    })
    return (
      <Widget title="Topics Monitor">
        <ErrorMessage message={error} />
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
              <Table.ColumnHeader hideBelow={'md'}>Type</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader hideBelow={'md'}>Subs</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Hz</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {topics.map((service, idx) => (
              <TopicItem key={idx} service={service} />
            ))}
          </Table.Body>
        </Table.Root>
      </Widget>
    </WidgetSkeleton>
  )
}
