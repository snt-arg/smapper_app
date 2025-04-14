import client from '@/shared/api/client'
import { TopicStatus } from '../types/Topic'

async function getTopics(): Promise<TopicStatus[]> {
  return client.get('/ros/topics').then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch topics')
    }
  })
}

async function getTopic(name: string): Promise<TopicStatus> {
  return client.get(`/ros/topics/${name}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch topic')
    }
  })
}

async function addTopicToMonitor(name: string): Promise<TopicStatus> {
  return client.post(`/topics/?topic_name=${name}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to add topic to monitor')
    }
  })
}

async function removeTopicToMonitor(name: string): Promise<TopicStatus> {
  return client.delete(`/topics/?topic_name=${name}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to remove topic from monitor')
    }
  })
}

export const TopicAPI = {
  getTopics,
  getTopic,
  addTopicToMonitor,
  removeTopicToMonitor,
}

export default {
  getTopics,
  getTopic,
  addTopicToMonitor,
  removeTopicToMonitor,
}
