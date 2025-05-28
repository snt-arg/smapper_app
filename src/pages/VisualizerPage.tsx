import { useEffect, useState } from 'react'
import ROSLIB from 'roslib'
import { Box, Grid, Heading } from '@chakra-ui/react'
import CameraCanvas from './CameraCanvas'

const cameraTopics = [
  { name: 'Front Left', topic: '/camera/front_left/image_raw' },
  { name: 'Front Right', topic: '/camera/front_right/image_raw' },
  { name: 'Side Left', topic: '/camera/side_left/image_raw' },
  { name: 'Side Right', topic: '/camera/side_right/image_raw' },
]

function VisualizerPage() {
  const [ros, setRos] = useState<ROSLIB.Ros>()

  useEffect(() => {
    const rosInstance = new ROSLIB.Ros({
      url: 'ws://localhost:9090',
    })

    rosInstance.on('connection', () => {
      console.log('Connected to rosbridge')
      setRos(rosInstance)
    })

    rosInstance.on('error', (error) => {
      console.error('ROS connection error:', error)
    })

    rosInstance.on('close', () => {
      console.log('Connection to rosbridge closed')
    })

    return () => rosInstance.close()
  }, [])

  return (
    <Box p={6}>
      <Heading mb={4}>Camera Visualizer</Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: '1fr 1fr',
        }}
        gap={6}
      >
        {cameraTopics.map((cam) => (
          <CameraCanvas
            key={cam.topic}
            name={cam.name}
            topicName={cam.topic}
            ros={ros}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default VisualizerPage
