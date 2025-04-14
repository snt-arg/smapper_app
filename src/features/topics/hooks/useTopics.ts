import { useState, useEffect } from 'react'
import TopicApi from '@/features/topics/api'
import { TopicStatus } from '@/features/topics/types/Topic'

export const useTopics = () => {
  const [topics, setTopics] = useState<TopicStatus[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await TopicApi.getTopics()
        setTopics(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    getTopics()

    const interval = setInterval(() => {
      getTopics()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return { topics, error, loading }
}
