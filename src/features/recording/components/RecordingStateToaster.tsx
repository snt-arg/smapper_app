import usePolling from '@/shared/hooks/usePolling'
import RecordingAPI from '@/features/recording/api'
import { toaster } from '@/shared/components/ui/toaster'
import { useEffect, useRef } from 'react'
import { formatSecondTimestamp } from '@/shared/utils/formatters'

const RECORDING_POLLING_INTERVAL = import.meta.env
  .VITE_SERVICES_POLLING_INTERVAL
  ? parseInt(import.meta.env.VITE_RECORDING_STATE_POLLING_INTERVAL as string)
  : 1000

export function RecordingStateToaster() {
  const recordingToastId = useRef<string | undefined>(undefined)
  const { data, error: error } = usePolling(
    RecordingAPI.getRecordingStatus,
    RECORDING_POLLING_INTERVAL,
    true
  )

  if (error) console.log('Error requesting recording state')

  const handleStopRecording = async () => {
    try {
      await RecordingAPI.stopRecording()

      // Show success toast
      toaster.create({
        title: 'Recording stopped',
        type: 'success',
        closable: true,
      })
    } catch (error) {
      console.error('Failed to stop recording:', error)
      toaster.create({
        title: 'Failed to stop recording',
        type: 'error',
        closable: true,
      })
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      if (data?.state === 'Recording' && data.metadata) {
        const elapsed = formatSecondTimestamp(data.metadata.elapsed_time)

        if (!recordingToastId.current) {
          recordingToastId.current = toaster.create({
            title: 'Recording in progress',
            description: `Elapsed Time: ${elapsed}`,
            type: 'loading',
            action: {
              label: 'Stop',
              onClick: () => {
                void (async () => {
                  await handleStopRecording()
                })()
              },
            },
          })
        } else {
          if (recordingToastId.current)
            toaster.update(recordingToastId.current, {
              description: `Elapsed Time: ${elapsed}`,
            })
        }
      } else {
        if (recordingToastId.current) {
          toaster.remove(recordingToastId.current)
          recordingToastId.current = undefined
        }
      }
    })
  }, [data])

  return <></>
}

export default RecordingStateToaster
