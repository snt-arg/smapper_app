import { useState, useEffect } from 'react'
import ServiceAPI from '@/features/services/api'
import { ServiceStatus } from '@/features/services/types/Service'

export const useServices = () => {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await ServiceAPI.getServices()
        setServices(data)
        setError('') // Reset error if successful
      } catch (error) {
        console.error('Error fetching services:', error)
        setError('Could not fetch services')
        setServices([]) // Reset the services on error
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
