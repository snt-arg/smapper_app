import client from '@/shared/api/client'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

function getRosbags(): Promise<RosbagMetadata[]> {
  return client.get('/rosbags/')
}

function deleteRosbag(id: number): Promise<void> {
  return client.delete('/rosbags/' + id)
}

export const RosbagAPI = {
  getRosbags,
  deleteRosbag,
}

export default {
  getRosbags,
  deleteRosbag,
}
