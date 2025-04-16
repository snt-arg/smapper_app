import { useState, useEffect } from 'react'
import RosbagApi from '@/features/rosbags/api/'
import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

export const useRosbags = () => {
  const [data, setData] = useState<RosbagMetadata[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getRosbags = async () => {
      try {
        const result = await RosbagApi.getRosbags()
        setData(result)
      } catch (error) {
        console.error('Error fetching rosbags:', error)
        setData([]) // Reset the services on error
      } finally {
        setLoading(false)
      }
    }

    getRosbags().catch((err) => {
      console.error('Error in useRosbags:', err)
      setLoading(false)
    })
  }, [])

  return { data, loading, setData }
}
