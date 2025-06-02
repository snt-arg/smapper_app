import client from '@/shared/api/client'
import { TopicStatus } from '../types/Topic'

async function getTopics(): Promise<TopicStatus[]> {
  const response = await client.get('/ros/topics')
  if (response.status === 200) {
    const data = response.data as TopicStatus[]
    return data.sort()
  }
  throw new Error('Failed to fetch topics')
}

async function getAllTopics(): Promise<TopicStatus[]> {
  const response = await client.get('/ros/topics/?all=true')
  if (response.status === 200) {
    const data = response.data as TopicStatus[]
    return data.sort()
  }
  throw new Error('Failed to fetch topics')
}

async function getTopic(name: string): Promise<TopicStatus> {
  const response = await client.get(`/ros/topics/${name}`)
  if (response.status === 200) {
    return response.data as TopicStatus
  }
  throw new Error('Failed to fetch topic')
}

async function addTopicToMonitor(name: string): Promise<TopicStatus> {
  const response = await client.post(`/topics/?topic_name=${name}`)
  if (response.status === 200) {
    return response.data as TopicStatus
  }
  throw new Error('Failed to add topic to monitor')
}

async function removeTopicToMonitor(name: string): Promise<TopicStatus> {
  const response = await client.delete(`/topics/?topic_name=${name}`)
  if (response.status === 200) {
    return response.data as TopicStatus
  }
  throw new Error('Failed to remove topic to monitor')
}

export const TopicAPI = {
  getTopics,
  getAllTopics,
  getTopic,
  addTopicToMonitor,
  removeTopicToMonitor,
}

export default {
  getTopics,
  getAllTopics,
  getTopic,
  addTopicToMonitor,
  removeTopicToMonitor,
}
