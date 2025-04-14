import { Table, Tag, Accordion } from '@chakra-ui/react'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString()
}

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h}h ${m}m ${s}s`
}

const formatSize = (size: number): string => {
  const mb = size / 1e6
  const gb = size / 1e9

  return gb < 1 ? mb.toFixed(0) + ' MB' : gb.toFixed(1) + ' GB'
}

export const RosbagItem = ({ rosbag }: { rosbag: RosbagMetadata }) => {
  const start_date = formatTimestamp(rosbag.start_time)
  const duration = formatDuration(rosbag.duration)
  const size = formatSize(rosbag.size)

  return (
    <Accordion.Root collapsible defaultValue={['b']}>
      <Accordion.Item key={0} value={rosbag.name}>
        <Accordion.ItemTrigger>
          <Table.Row>
            <Table.Cell>{rosbag.name}</Table.Cell>
            <Table.Cell>{start_date}</Table.Cell>
            <Table.Cell>
              {rosbag.tags?.split(',').map((tag?) => (
                <Tag.Root>
                  <Tag.Label>{tag}</Tag.Label>
                </Tag.Root>
              ))}
            </Table.Cell>
            <Table.Cell>{duration}</Table.Cell>
            <Table.Cell hideBelow="md">{size}</Table.Cell>
          </Table.Row>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent></Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
