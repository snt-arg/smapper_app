import {
  Presets,
  RecordingStartRequest,
} from '@/features/recording/types/Recording'
import { RecordingStatus } from '@/features/recording/types/Recording'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'
import client from '@/shared/api/client'

async function getRecordingStatus(): Promise<RecordingStatus> {
  const response = await client.get('/recording/')
  if (response.status === 200) {
    return response.data as RecordingStatus
  }
  throw new Error('Failed to get recording status')
}

async function getRecordingPresets(): Promise<Presets> {
  const response = await client.get('/recording/presets')
  if (response.status === 200) {
    return response.data as Presets
  }
  throw new Error('Failed to get recording status')
}

async function startRecording(
  data: RecordingStartRequest
): Promise<RecordingStatus> {
  const response = await client.post('/recording/start', data)
  if (response.status === 200) {
    return response.data as RecordingStatus
  }
  throw new Error('Failed to get recording status')
}

async function stopRecording(): Promise<RosbagMetadata> {
  const response = await client.post('/recording/stop')
  if (response.status === 200) {
    return response.data as RosbagMetadata
  }
  throw new Error('Failed to get recording status')
}

export const RecordingAPI = {
  getRecordingStatus,
  getRecordingPresets,
  startRecording,
  stopRecording,
}

export default RecordingAPI
