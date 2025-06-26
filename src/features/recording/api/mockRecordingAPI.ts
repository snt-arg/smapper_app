import { Presets, RecordingStatus } from '@/features/recording/types/Recording'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

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

function getRecordingPresets(): Promise<Presets> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cameras: ['/camera/front_right/image_raw'],
        lidar: ['/ouster/points', '/ouster/imu'],
      })
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

function stopRecording(): Promise<RosbagMetadata> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (recordingStatus.state !== 'Recording') {
        throw Error('Recording session is not running')
      }

      // BUG: ID is hardcoded
      const data: RosbagMetadata = {
        id: 132,
        name: 'Some name',
        size: 213242,
        duration: 124,
        start_time: 1234213241,
        end_time: 31234123423,
        detail: 'Some detail',
        tags: 'tag1, tag2',
        topics: [],
      }

      recordingStatus.state = 'Idle'
      recordingStatus.metadata = undefined
      resolve(data)
    }, 200)
  })
}

export const RecordingAPI = {
  getRecordingStatus,
  startRecording,
  stopRecording,
  getRecordingPresets,
}

export default RecordingAPI
