import {
  Skeleton,
  Table,
  Container,
  Stack,
  Grid,
  SimpleGrid,
  useBreakpointValue,
  Button,
  HStack,
} from '@chakra-ui/react'
import { RosbagItem } from './RosbagItem'
import { useRosbags } from '@/hooks/useRosbags'
import { toaster } from '@/components/ui/toaster'
import RosbagCard from './RosbagCard'
import { useEffect, useRef, useState } from 'react'
import {
  fetchRecordingStatus,
  startRecording,
  stopRecording,
} from '@/api/RecordApi'
import { RecordingStatus } from '@/types/Recording'
import RecordingModal from './RosbagCreateModal'

export default function RosbagList() {
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 4 })
  const { data, loading } = useRosbags()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const recordingToastId = useRef<string | undefined>(undefined)

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isRecording) {
        try {
          const status = await fetchRecordingStatus()
          setRecordingStatus(status)
        } catch (err) {
          console.error(err)
        }

        if (recordingStatus?.metadata) {
          const elapsed = formatTime(recordingStatus.metadata?.elapsed_time)
          if (recordingToastId.current)
            toaster.update(recordingToastId.current, {
              description: `Elapsed Time: ${elapsed}`,
            })
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [elapsedTime, recordingToastId, isRecording, recordingStatus])

  const handleStartRecording = async () => {
    console.log('Starting....')
    try {
      const status = await startRecording()
      setRecordingStatus(status)
      setIsRecording(true)
      setElapsedTime(0)

      toaster.create({
        title: 'Recording started',
        type: 'success',
        closable: true,
      })

      recordingToastId.current = toaster.create({
        title: 'Recording...',
        description: `Elapsed Time: ${formatTime(elapsedTime)}`,
        type: 'loading',
      })
    } catch (error) {
      console.error('Failed to start recording:', error)
      toaster.create({
        title: 'Failed to start recording',
        type: 'error',
        closable: true,
      })
    }
  }

  const handleStopRecording = async () => {
    try {
      const status = await stopRecording()
      setRecordingStatus(status)
      setIsRecording(false)

      // Close the persistent toast
      if (recordingToastId.current) {
        toaster.remove(recordingToastId.current)
        recordingToastId.current = undefined
      }

      // Show success toast
      toaster.create({
        title: 'Recording stopped',
        type: 'success',
        closable: true,
      })

      // TODO: Update data
    } catch (error) {
      console.error('Failed to stop recording:', error)
      toaster.create({
        title: 'Failed to stop recording',
        type: 'error',
        closable: true,
      })
    }
  }

  return (
    <Skeleton loading={loading}>
      <HStack mb={4} gap={4}>
        <RecordingModal disabled={isRecording} onStart={handleStartRecording} />
        <Button
          disabled={!isRecording}
          colorPalette="red"
          onClick={handleStopRecording}
        >
          Stop Recording
        </Button>
      </HStack>

      <SimpleGrid columns={columns} gap="4">
        {data.map((rosbag) => (
          <RosbagCard rosbag={rosbag} key={rosbag.id} />
        ))}
      </SimpleGrid>
    </Skeleton>
  )
}
