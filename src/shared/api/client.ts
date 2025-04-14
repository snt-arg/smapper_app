import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Global error handling via interceptors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error: ', error)
    return Promise.reject(error)
  }
)

export default client
