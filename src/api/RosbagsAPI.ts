import { RosbagMetadata } from '@/types/ros/Rosbag'
import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/rosbags`

/**
 * Fetch all Rosbags from the API.
 *
 * @returns {Promise<RosbagMetadata[]>} A promise which returns an array of sensors.
 */
export async function fetchRosbags(): Promise<RosbagMetadata[]> {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching rosbags:', error)
    throw error
  }
}

// TODO:
