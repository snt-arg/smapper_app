function VisualizerPage() {
  return (
    <div style={{ width: '100%', height: '100vh', border: 'none' }}>
      <iframe
        src="http://localhost:8888"
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
