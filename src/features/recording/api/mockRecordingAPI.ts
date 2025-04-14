import { RecordingStatus } from '@/features/recording/types/Recording'

const recordingStatus: RecordingStatus = { state: 'Idle' }

function getRecordingStatus(): Promise<RecordingStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (recordingStatus.state !== 'Recording') {
        throw Error('Recording session is not running')
      }
      resolve(recordingStatus)
    }, 200)
  })
}

function startRecording(): Promise<RecordingStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (recordingStatus.state !== 'Idle') {
        throw Error('Recording is already in progress')
      }

      recordingStatus.state = 'Recording'
      recordingStatus.metadata = {
        elapsed_time: 23,
        bag_name: 'Some name',
        bag_size: 213242,
        start_time: 1234213241,
        stop_time: 31234123423,
        topics: [],
      }
      resolve(recordingStatus)
    }, 200)
  })
}

function stopRecording(): Promise<RecordingStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (recordingStatus.state !== 'Recording') {
        throw Error('Recording session is not running')
      }

      recordingStatus.state = 'Idle'
      recordingStatus.metadata = {
        elapsed_time: 124,
        bag_name: 'Some name',
        bag_size: 213242,
        start_time: 1234213241,
        stop_time: 31234123423,
        topics: [],
      }
      const finalStatus = recordingStatus
      recordingStatus.metadata = undefined
      resolve(finalStatus)
    }, 200)
  })
}

export const RecordingAPI = {
  getRecordingStatus,
  startRecording,
  stopRecording,
}

export default {
  getRecordingStatus,
  startRecording,
  stopRecording,
}
