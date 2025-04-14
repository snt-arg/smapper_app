import { RecordingStartRequest } from '@/features/recording/types/Recording'
import { RecordingStatus } from '@/features/recording/types/Recording'
import client from '@/shared/api/client'

function getRecordingStatus(): Promise<RecordingStatus> {
  return client.get('/recording/status/')
}

function startRecording(data: RecordingStartRequest): Promise<RecordingStatus> {
  return client.post('/recording/start/', data)
}

function stopRecording(): Promise<RecordingStatus> {
  return client.post('/recording/stop/')
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
