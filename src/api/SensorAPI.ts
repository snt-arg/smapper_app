import { SensorMetadata } from '../types/Sensor'
import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/sensors`

/**
 * Fetch all sensors from the API.
 *
 * @returns {Promise<ServiceSchema[]>} A promise which returns an array of sensors.
 */
export async function fetchSensors(): Promise<SensorMetadata[]> {
  try {
    const response = await axios.get(BASE_URL + "/")
    return response.data
  } catch (error) {
    console.error('Error fetching sensors:', error)
    throw error
  }
}

/**
 * Fetch a sensor by it's id.
 *
 * @param id {string} Id of the sensor to fetch
 * @returns {Promise<ServiceSchema[]>} A promise which returns the Sensor metadata.
 */
export async function fetchServiceById(id: string): Promise<SensorMetadata> {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching sensors:', error)
    throw error
  }
}
