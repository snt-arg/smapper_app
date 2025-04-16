import {
  Skeleton,
  SimpleGrid,
  useBreakpointValue,
  Button,
  HStack,
} from '@chakra-ui/react'
import { useRosbags } from '@/features/rosbags/hooks/useRosbags'
import { toaster } from '@/shared/components/ui/toaster'
import RosbagCard from './RosbagCard'
import { useEffect, useRef, useState } from 'react'
import RecordingAPI from '@/features/recording/api/'
import {
  RecordingStartRequest,
  RecordingStatus,
} from '@/features/recording/types/Recording'
import RecordingModal from './RosbagCreateModal'
import RosbagAPI from '../api'
import { formatSecondTimestamp } from '@/shared/utils/formatters'

export default function RosbagList() {
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 4 })
  const { data, loading, setData } = useRosbags()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const recordingToastId = useRef<string | undefined>(undefined)

  const handleDelete = (id: number) => {
    const callDelete = async () => {
      try {
        await RosbagAPI.deleteRosbag(id)
        setData((prevCards) => prevCards.filter((card) => card.id !== id))
      } catch (err) {
        console.error(err)
      }
    }

    callDelete().catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isRecording) {
        try {
          const status = await RecordingAPI.getRecordingStatus()
          setRecordingStatus(status)
        } catch (err) {
          console.error(err)
        }

        if (recordingStatus?.metadata) {
          setElapsedTime(recordingStatus.metadata?.elapsed_time)
          const elapsed = formatSecondTimestamp(
            recordingStatus.metadata?.elapsed_time
          )
          if (recordingToastId.current)
            toaster.update(recordingToastId.current, {
              description: `Elapsed Time: ${elapsed}`,
            })
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [elapsedTime, recordingToastId, isRecording, recordingStatus])

  const handleStartRecording = async (bag: RecordingStartRequest) => {
    console.log('Starting....')
    try {
      const status = await RecordingAPI.startRecording(bag)
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
        description: `Elapsed Time: ${formatSecondTimestamp(elapsedTime)}`,
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
      const newBag = await RecordingAPI.stopRecording()
      setRecordingStatus(null)
      setIsRecording(false)

      // Update the data with the new bag
      setData((prevBags) => [...prevBags, newBag])

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
    <Skeleton loading={loading} divideY="2px">
      <HStack mb={4} gap={4} w="100%">
        <RecordingModal disabled={isRecording} onStart={handleStartRecording} />
        <Button
          disabled={!isRecording}
          size={{ base: 'xs', sm: 'lg' }}
          colorPalette="red"
          onClick={handleStopRecording}
        >
          Stop Recording
        </Button>
      </HStack>

      <SimpleGrid columns={columns} gap="4" pt="4">
        {data.map((rosbag) => (
          <RosbagCard rosbag={rosbag} key={rosbag.id} onDelete={handleDelete} />
        ))}
      </SimpleGrid>
    </Skeleton>
  )
}
