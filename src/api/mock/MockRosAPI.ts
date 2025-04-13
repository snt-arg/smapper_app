import { TopicStatus } from '@/types/ros/Topic'

const topics: TopicStatus[] = [
  {
    name: '/ouster/points',
    msg_type: '/sensors/msgs/PointCloud2',
    status: 'Online',
    subscribers: 0,
    hz: 10,
  },
  {
    name: '/ouster/imu',
    msg_type: '/sensors/msgs/Imu',
    status: 'Online',
    subscribers: 10,
    hz: 100,
  },
  {
    name: '/camera/front_left/image_raw',
    msg_type: '/sensors/msgs/Image',
    status: 'Offline',
    subscribers: 10,
    hz: 0,
  },
  {
    name: '/camera/front_right/image_raw',
    msg_type: '/sensors/msgs/Image',
    status: 'Online',
    subscribers: 10,
    hz: 30,
  },
]

export async function fetchTopics(): Promise<TopicStatus[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topics)
    }, 200)
  })
}

export async function fetchTopic(name: string): Promise<TopicStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const topic = topics.find((item) => item.name === name)
      if (!topic) {
        throw Error('Error finding topic')
      }
      resolve(topic)
    }, 200)
  })
}

// TODO:: Add rest of client calls
