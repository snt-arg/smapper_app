import { Table } from '@chakra-ui/react' // or your preferred UI library
import { TopicStatus } from '@/features/topics/types/Topic'
import TopicStatusBadge from './TopicStatusBadge'

export const TopicItem = ({ service: topic }: { service: TopicStatus }) => (
  <Table.Row>
    <Table.Cell>{topic.name}</Table.Cell>
    <Table.Cell>
      <TopicStatusBadge status={topic.status} />
    </Table.Cell>
    <Table.Cell textAlign="end">{topic.hz.toFixed(1)}</Table.Cell>
    <Table.Cell hideBelow={'md'} textAlign="center">
      {topic.subscribers}
    </Table.Cell>
  </Table.Row>
)
