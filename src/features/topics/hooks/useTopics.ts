import { useState, useEffect } from 'react'
import TopicApi from '@/features/topics/api'
import { TopicStatus } from '@/features/topics/types/Topic'

export const useTopics = () => {
  const [topics, setTopics] = useState<TopicStatus[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await TopicApi.getTopics()
        setTopics(data)
        setError('') // Reset error if successful
      } catch (error) {
        console.error('Error fetching topics:', error)
        setError('Could not fetch services')
        setTopics([]) // Reset the services on error
      }
    }

    getTopics()

    const interval = setInterval(() => {
      getTopics()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return { topics: topics, error }
}
