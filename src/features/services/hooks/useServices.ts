import { useState, useEffect } from 'react'
import ServiceAPI from '@/features/services/api'
import { ServiceStatus } from '@/features/services/types/Service'

export const useServices = () => {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await ServiceAPI.getServices()
        setServices(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    getServices()

    const interval = setInterval(() => {
      getServices()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return { services, error, loading }
}
