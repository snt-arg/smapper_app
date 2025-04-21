import { FoxgloveClient } from '@foxglove/ws-protocol'
import { parse, stringify } from '@foxglove/rosmsg'
import { useEffect, useState } from 'react'

function decodeFoxgloveMessage(view: DataView) {
  let offset = 0

  // 1 byte - opcode
  const opcode = view.getUint8(offset)
  offset += 1

  // 4 bytes - subscription ID
  const subscriptionId = view.getUint32(offset, true) // little-endian
  offset += 4

  // 8 bytes - timestamp (uint64 -> BigInt)
  const low = view.getUint32(offset, true)
  const high = view.getUint32(offset + 4, true)
  const timestamp = (BigInt(high) << 32n) + BigInt(low)
  offset += 8

  // Remaining bytes - message payload
  const payload = new Uint8Array(view.buffer.slice(offset))

  const decoder = new TextDecoder('utf-8')

  console.log('Decoded message:')
  console.log('  Opcode:', opcode)
  console.log('  Subscription ID:', subscriptionId)
  console.log('  Timestamp (ns):', timestamp.toString())
  console.log('  Payload (length):', payload.length)
  console.log('  Payload (bytes):', payload)
  console.log('  Payload utf:', decoder.decode(payload))

  return { opcode, subscriptionId, timestamp, payload }
}

export function useFoxglove(wsUrl: string) {
  const [messages, setMessages] = useState<Record<string, any>>({})

  useEffect(() => {
    const client = new FoxgloveClient({
      ws: new WebSocket(wsUrl, [FoxgloveClient.SUPPORTED_SUBPROTOCOL]),
    })

    const deserializers = new Map<number, (data: Uint8Array) => any>()
    const topicToSubId = new Map<string, number>()

    client.on('advertise', (channels) => {
      for (const channel of channels) {
        if (channel.encoding !== 'cdr') return

        if (channel.topic !== '/topic1') {
          continue
        }

        console.log('Subscribing to channel:', channel)
        const subId = client.subscribe(channel.id)
        topicToSubId.set(channel.topic, subId)
        deserializers.set(subId, decodeFoxgloveMessage)
      }
    })

    client.on('message', ({ subscriptionId, data }) => {
      const deserialize = deserializers.get(subscriptionId)
      if (!deserialize) return
      deserialize(data)

      const topic = [...topicToSubId.entries()].find(
        ([, id]) => id === subscriptionId
      )?.[0]
      if (topic) {
        setMessages((prev) => ({ ...prev, [topic]: {} }))
      }
    })

    return () => client.close()
  }, [wsUrl])

  return messages
}

export default useFoxglove
