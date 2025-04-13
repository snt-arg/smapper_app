import { useState, useEffect } from 'react'
import { fetchServices as realFetchServices } from '@/api/ServiceAPI'
import { mockFetchServices } from '@/api/mock/MockServiceAPI'
import { ServiceStatus } from '@/types/Service'

const fetchServices = import.meta.env.PROD
  ? realFetchServices
  : mockFetchServices

export const useServices = () => {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
        setError('') // Reset error if successful
      } catch (error) {
        setError('Could not fetch services')
        setServices([]) // Reset the services on error
      } finally {
      }
    }

    getServices()

    const interval = setInterval(() => {
      getServices()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return { services, error }
}
