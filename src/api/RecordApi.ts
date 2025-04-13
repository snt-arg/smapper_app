import { RecordingStartRequest, RecordingStatus } from '@/types/Recording'
import { SensorMetadata } from '../types/Sensor'
import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/recording`

/**
 * Fetch current status of the recording manager.
 *
 * @returns {Promise<ServiceSchema[]>} A promise which returns the current recording status.
 */
export async function fetchRecordingStatus(): Promise<RecordingStatus> {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching recording status:', error)
    throw error
  }
}

/**
 * Requests a recording to be started
 *
 * @returns {Promise<ServiceSchema[]>} A promise which returns the current recording status.
 */
export async function startRecording(
  data: RecordingStartRequest
): Promise<RecordingStatus> {
  try {
    const response = await axios.post(BASE_URL + '/start', data)
    return response.data
  } catch (error) {
    console.error('Error starting recording:', error)
    throw error
  }
}
/**
 * Requests a recording to be stopped
 *
 * @returns {Promise<ServiceSchema[]>} A promise which returns the current recording status.
 */
export async function stopRecording(): Promise<RecordingStatus> {
  try {
    const response = await axios.post(BASE_URL + '/stop')
    return response.data
  } catch (error) {
    console.error('Error starting recording:', error)
    throw error
  }
}
