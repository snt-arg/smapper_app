import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 10000,
})

// Global error handling via interceptors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        console.error('Resource not found:', error.response.data)
      } else {
        console.error('Internal server error:', error.response.data)
      }
    } else {
      console.error('API is unreachable')
    }
    return Promise.reject(error)
  }
)

export default client
