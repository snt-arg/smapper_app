import client from '@/shared/api/client'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

async function getRosbags(): Promise<RosbagMetadata[]> {
  const response = await client.get('/rosbags/')
  if (response.status === 200) {
    return response.data
  }
  throw new Error('Failed to fetch rosbags')
}

async function deleteRosbag(id: number): Promise<void> {
  const response = await client.delete('/rosbags/' + id)
  if (response.status === 200) {
    return response.data
  }
  throw new Error('Failed to delete rosbag')
}

export const RosbagAPI = {
  getRosbags,
  deleteRosbag,
}

export default {
  getRosbags,
  deleteRosbag,
}
