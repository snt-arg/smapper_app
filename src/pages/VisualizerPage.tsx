function VisualizerPage() {
  const rosboard_url = import.meta.env.VITE_ROSBOARD_URL as string

  return (
    <div style={{ width: '100%', height: '100vh', border: 'none' }}>
      <iframe
        src={rosboard_url}
        title="Embedded Website"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}

export default VisualizerPage
