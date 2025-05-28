import { useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import ROSLIB from 'roslib'

interface ImageMessage {
  width: number
  height: number
  encoding: string
  data: string
}

function CameraCanvas({
  name,
  topicName,
  ros,
}: {
  name: string
  topicName: string
  ros?: ROSLIB.Ros
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log('canvas')
    if (!ros) return

    const topic = new ROSLIB.Topic({
      ros,
      name: topicName,
      messageType: 'sensor_msgs/Image',
    })

    topic.subscribe((msg: ROSLIB.Message) => {
      const { width, height, encoding, data } = msg as ImageMessage

      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      const imageData = ctx?.createImageData(width, height)

      const raw = Uint8Array.from(atob(data), (c) => c.charCodeAt(0))

      if (imageData == null) return

      if (encoding === 'bgr8') {
        for (let i = 0, j = 0; i < raw.length; i += 3, j += 4) {
          imageData.data[j + 0] = raw[i + 2] // R
          imageData.data[j + 1] = raw[i + 1] // G
          imageData.data[j + 2] = raw[i] // B
          imageData.data[j + 3] = 255 // A
        }
      } else if (encoding === 'rgb8') {
        for (let i = 0, j = 0; i < raw.length; i += 3, j += 4) {
          imageData.data[j + 0] = raw[i]
          imageData.data[j + 1] = raw[i + 1]
          imageData.data[j + 2] = raw[i + 2]
          imageData.data[j + 3] = 255
        }
      } else if (encoding === 'mono8') {
        for (let i = 0, j = 0; i < raw.length; i++, j += 4) {
          const gray = raw[i]
          imageData.data[j + 0] = gray
          imageData.data[j + 1] = gray
          imageData.data[j + 2] = gray
          imageData.data[j + 3] = 255
        }
      } else {
        console.warn('Unsupported encoding:', encoding)
        return
      }

      ctx?.putImageData(imageData, 0, 0)
    })

    return () => topic.unsubscribe()
  }, [ros, topicName])

  return (
    <Box borderWidth="1px" borderRadius="md" p={2}>
      <Text fontSize="lg" mb={2}>
        {name}
      </Text>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </Box>
  )
}

export default CameraCanvas
