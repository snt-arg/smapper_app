import { useEffect, useState } from 'react'

function usePolling<T>(
  fetchFunction: () => Promise<T>,
  interval: number,
  immediate = true
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (!isMounted) setLoading(true)
        const result = await fetchFunction()
        if (isMounted) {
          setData(result)
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error)
          setData(null)
        }
        console.error('Error fetching data:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (immediate) {
      void fetchData()
    }

    const timer = setInterval(() => {
      void fetchData()
    }, interval)

    return () => {
      isMounted = false
      clearInterval(timer)
    }
  }, [fetchFunction, interval, immediate])

  return { data, loading, error }
}

export default usePolling
