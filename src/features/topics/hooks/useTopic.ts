import { useState, useEffect } from 'react'
import TopicApi from '@/features/topics/api'
import { TopicStatus } from '@/features/topics/types/Topic'

export function useTopic(name: string): {
  topic?: TopicStatus
  error?: Error
} {
  const [topic, setTopic] = useState<TopicStatus>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const getTopic = async () => {
      try {
        const data = await TopicApi.getTopic(name)
        setTopic(data)
      } catch (error) {
        setError(error as Error)
      }
    }
    void getTopic()
  }, [name])

  return { topic, error }
}
