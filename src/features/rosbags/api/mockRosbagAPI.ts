import { RosbagMetadata } from '@/features/rosbags/types/Rosbag'

function getRosbags(): Promise<RosbagMetadata[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rosbags)
    }, 200)
  })
}

function getRosbag(id: number): Promise<RosbagMetadata> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rosbag = rosbags.find((item) => item.id === id)
      if (!rosbag) {
        throw Error('Error finding topic')
      }
      resolve(rosbag)
    }, 200)
  })
}

function deleteRosbag(id: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = rosbags.findIndex((item) => item.id === id)
      if (index !== -1) {
        rosbags.splice(index, 1)
      }
      resolve(undefined)
    }, 200)
  })
}

export const RosbagAPI = {
  getRosbags,
  getRosbag,
  deleteRosbag,
}

export default {
  getRosbags,
  getRosbag,
  deleteRosbag,
}

const rosbags: RosbagMetadata[] = [
  {
    id: 1,
    name: 'Morning Drive',
    size: 50.2 * 1e9,
    duration: 3600,
    start_time: 1744189961,
    end_time: 1744191161,
    detail: 'Recording of the morning drive around the city',
    tags: 'driving',
    topics: [
      {
        id: 0,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 1, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
  {
    id: 2,
    name: 'Obstacle Course',
    size: 512 * 1e6,
    duration: 1800,
    start_time: 1744189961,
    end_time: 1744191161,
    detail: 'Testing the device on an obstacle course',
    tags: 'testing,obstacles',
    topics: [
      {
        id: 2,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 3, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
  {
    id: 3,
    name: 'Bloc E Ground Floor',
    size: 512 * 1e6,
    duration: 1800,
    start_time: 1744189961,
    end_time: 1744191161,
    detail:
      'This is a very long description of the rosbag which is supposed to show how this looks like in the rosbag card.',
    topics: [
      {
        id: 4,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 5, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
      { id: 6, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
      { id: 7, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
      { id: 8, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
  {
    id: 4,
    name: 'Obstacle Course',
    size: 512 * 1e6,
    duration: 1800,
    start_time: 1744189961,
    end_time: 1744191161,
    detail: 'Testing the device on an obstacle course',
    topics: [
      {
        id: 9,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 10, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
  {
    id: 5,
    name: 'Obstacle Course',
    size: 512 * 1e6,
    duration: 1800,
    start_time: 1744189961,
    end_time: 1744191161,
    detail: 'Testing the device on an obstacle course',
    tags: 'testing,obstacles',
    topics: [
      {
        id: 11,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 12, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
  {
    id: 6,
    name: 'Obstacle Course',
    size: 512 * 1e6,
    duration: 1800,
    start_time: 1744189961,
    end_time: 1744191161,
    detail: 'Testing the device on an obstacle course',
    tags: 'testing,obstacles',
    topics: [
      {
        id: 13,
        name: '/camera/front_right/image_raw',
        msg_type: 'sensor_msgs/Image',
      },
      { id: 14, name: '/ouster/points', msg_type: 'sensor_msgs/PointCloud2' },
    ],
  },
]
