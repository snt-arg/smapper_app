import useFoxglove from '@/features/viewer/hooks/useFoxglove'

function VisualizerPage() {
  useFoxglove('ws://localhost:8765')
  return (
    <>
      <h1>This is the VisualizerPage</h1>
    </>
  )
}

export default VisualizerPage
