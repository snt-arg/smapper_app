import { RosbagMetadata } from '@/types/ros/Rosbag'
import {
  Badge,
  Card,
  List,
  Heading,
  HStack,
  Text,
  Tag,
  Show,
  Box,
  Checkbox,
  Button,
  Flex,
} from '@chakra-ui/react'
import { DatabaseIcon, TimerIcon } from 'lucide-react'
import { useState } from 'react'
import { resolvePath } from 'react-router-dom'

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear()
}

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h <= 0) return `${m}m ${s}s`
  return `${h}h ${m}m`
}

const formatSize = (size: number): string => {
  const mb = size / 1e6
  const gb = size / 1e9

  return gb < 1 ? mb.toFixed(0) + ' MB' : gb.toFixed(1) + ' GB'
}

const Body = ({ rosbag }: { rosbag: RosbagMetadata }) => {
  const [expanded, setExpand] = useState(false)

  return (
    <Card.Body flexDir="column" spaceY="2">
      {rosbag.detail}
      <Card.Description flexDir="column">
        <Show when={expanded}>
          <Heading size="md" mt="5" mb="2">
            Topics{' '}
          </Heading>
          <List.Root pl="5">
            {rosbag.topics.map((topic) => (
              <List.Item key={topic.id}>{topic.name}</List.Item>
            ))}
          </List.Root>
        </Show>
      </Card.Description>

      <Flex justifyContent="flex-end" w="100%">
        <Button
          variant="outline"
          size="xs"
          h="7"
          onClick={() => {
            setExpand(!expanded)
          }}
        >
          {expanded ? 'less' : 'more'}
        </Button>
      </Flex>
    </Card.Body>
  )
}

const Footer = ({ rosbag }: { rosbag: RosbagMetadata }) => (
  <Card.Footer flexDir="column" spaceY="2">
    <HStack justifyContent="space-between" w="100%">
      <Tag.Root variant="solid" colorPalette="blue">
        <Tag.StartElement>
          <TimerIcon />
        </Tag.StartElement>
        <Tag.Label>{formatDuration(rosbag.duration)}</Tag.Label>
      </Tag.Root>

      <Tag.Root variant="solid" colorPalette="blue">
        <Tag.StartElement>
          <DatabaseIcon />
        </Tag.StartElement>
        <Tag.Label>{formatSize(rosbag.size)}</Tag.Label>
      </Tag.Root>
    </HStack>

    <HStack wrap="wrap" w="100%">
      {rosbag.tags?.map((tag, key) => (
        <Badge variant="outline" textStyle="sm" key={key}>
          {tag}
        </Badge>
      ))}
    </HStack>

    <HStack w="100%" justifyContent="flex-end">
      <Button variant="outline">Delete</Button>
      <Button>Update</Button>
    </HStack>
  </Card.Footer>
)

export default function RosbagCard({ rosbag }: { rosbag: RosbagMetadata }) {
  return (
    <Card.Root variant="subtle" maxW="lg">
      <Card.Header>
        <HStack justifyContent="space-between">
          <Heading>{rosbag.name}</Heading>
          <Text>{formatTimestamp(rosbag.start_time)}</Text>
        </HStack>
      </Card.Header>
      <Body rosbag={rosbag} />
      <Footer rosbag={rosbag} />
    </Card.Root>
  )
}
