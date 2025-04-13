// TODO: Convert this into a chackra component
export const ErrorMessage = ({ message }: { message: string }) => (
  <div style={{ color: 'red' }}>
    <h3>Error:</h3>
    <p>{message}</p>
  </div>
)
