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
import { useEffect, useReducer } from 'react'
import RecordingAPI from '@/features/recording/api/'
import usePolling from '@/shared/hooks/usePolling'
import {
  RecordingStartRequest,
  RecordingStatus,
} from '@/features/recording/types/Recording'
import StartRecordingModal from '@/features/recording/components/StartRecordingModal'
import RosbagAPI from '../api'
import { RosbagMetadata, RosbagMetadatUpdate } from '../types/Rosbag'

enum RecordingActionKind {
  UPDATE,
  SET_ROSBAGS,
}

interface RecordingAction {
  type: RecordingActionKind
  new_status?: RecordingStatus
  new_bags?: RosbagMetadata[]
}

interface RecordingState {
  recordingStatus: RecordingStatus | undefined
  isRecording: boolean
  rosbags?: RosbagMetadata[]
}

function reducer(state: RecordingState, action: RecordingAction) {
  switch (action.type) {
    case RecordingActionKind.UPDATE:
      return {
        ...state,
        recordingState: action.new_status,
        isRecording: action.new_status?.state === 'Recording',
      }
    case RecordingActionKind.SET_ROSBAGS:
      return {
        ...state,
        rosbags: action.new_bags ? action.new_bags : [],
      }
    default:
      return state
  }
}

export default function RosbagList() {
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 4 })
  const { data, loading, setData } = useRosbags()
  const { data: recordingStatus } = usePolling(
    RecordingAPI.getRecordingStatus,
    5000,
    true
  )
  const [state, dispatch] = useReducer(reducer, {
    recordingStatus: recordingStatus,
    isRecording: false,
    rosbags: [],
  })

  useEffect(() => {
    dispatch({ type: RecordingActionKind.UPDATE, new_status: recordingStatus })
  }, [recordingStatus])

  useEffect(() => {
    dispatch({ type: RecordingActionKind.SET_ROSBAGS, new_bags: data })
  }, [data])

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

  const handleUpdate = (id: number, data: Partial<RosbagMetadatUpdate>) => {
    const callUpdate = async () => {
      try {
        const updated = await RosbagAPI.updateRosbag(id, data)
        setData((prev) => prev.map((bag) => (bag.id === id ? updated : bag)))
      } catch (error) {
        console.error(error)
      }
    }
    callUpdate().catch((err) => {
      console.error(err)
    })
  }

  const handleStartRecording = async (bag: RecordingStartRequest) => {
    try {
      await RecordingAPI.startRecording(bag)

      toaster.create({
        title: 'Recording started',
        type: 'success',
        closable: true,
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
      setData((prevBags) => [...prevBags, newBag])

      // Show success toast
      toaster.create({
        title: 'Recording stopped',
        type: 'success',
        closable: true,
      })
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
        <StartRecordingModal
          disabled={state.isRecording}
          onStart={(data: RecordingStartRequest) => {
            void (async () => {
              await handleStartRecording(data)
            })()
          }}
        />
        <Button
          disabled={!state.isRecording}
          size={{ base: 'xs', sm: 'lg' }}
          colorPalette="red"
          onClick={() => {
            void (async () => {
              await handleStopRecording()
            })()
          }}
        >
          Stop Recording
        </Button>
      </HStack>

      <SimpleGrid columns={columns} gap="4" pt="4">
        {state.rosbags?.map((rosbag) => (
          <RosbagCard
            rosbag={rosbag}
            key={rosbag.id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </SimpleGrid>
    </Skeleton>
  )
}
