import {
  Button,
  Badge,
  CloseButton,
  Container,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
  Table,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { fetchRosbags } from '@/api/mock/MockRosbagsAPI'
import { useState } from 'react'
import { RosbagMetadata } from '@/types/ros/Rosbag'
import RosbagActionBar from './RosbagActionBar'

export default function RosbagsTable() {
  const [rosbags, setRosbags] = useState<RosbagMetadata[]>([])
  const { onOpen } = useDisclosure()

  const getRosbags = async () => {
    try {
      const data = await fetchRosbags()
      setRosbags(data)
    } catch (error) {
      setRosbags([]) // Reset the services on error
    } finally {
    }
  }

  getRosbags()

  return (
    <Container>
      <RosbagActionBar open={true} />
    </Container>
  )
}
