import axios from 'axios'
import { TopicStatus } from '@/types/ros/Topic'

const BASE_URL = `${import.meta.env.VITE_API_URL}/ros`

export async function fetchTopics(): Promise<TopicStatus[]> {
  const url: string = `${BASE_URL}/topics/`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log('Failed to fetch ros topics')
    throw error
  }
}

export async function fetchTopic(name: string): Promise<TopicStatus> {
  const url: string = `${BASE_URL}/topics/${name}/`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log('Failed to fetch ros topic with name ', name)
    throw error
  }
}

export async function addTopicToMonitor(name: string): Promise<TopicStatus> {
  const url: string = `${BASE_URL}/topics/?topic_name=${name}/`

  try {
    const response = await axios.post(url)
    return response.data
  } catch (error) {
    console.log('Failed to add ros topic with name ', name)
    throw error
  }
}

export async function removeTopicToMonitor(name: string): Promise<TopicStatus> {
  const url: string = `${BASE_URL}/topics/?topic_name=${name}/`

  try {
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.log('Failed to delete ros topic with name ', name)
    throw error
  }
}
