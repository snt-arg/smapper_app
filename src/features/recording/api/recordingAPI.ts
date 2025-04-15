import { RecordingStartRequest } from '@/features/recording/types/Recording'
import { RecordingStatus } from '@/features/recording/types/Recording'
import client from '@/shared/api/client'

async function getRecordingStatus(): Promise<RecordingStatus> {
  const response = await client.get('/recording/')
  if (response.status === 200) {
    return response.data
  }
  throw new Error('Failed to get recording status')
}

async function startRecording(
  data: RecordingStartRequest
): Promise<RecordingStatus> {
  const response = await client.post('/recording/start', data)
  if (response.status === 200) {
    return response.data
  }
  throw new Error('Failed to get recording status')
}

async function stopRecording(): Promise<RecordingStatus> {
  const response = await client.post('/recording/stop')
  if (response.status === 200) {
    return response.data
  }
  throw new Error('Failed to get recording status')
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
