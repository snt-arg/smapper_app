import { useEffect, useState } from 'react'

function usePolling<T>(
  fetchFunction: () => Promise<T>,
  interval: number,
  immediate = true
): { data?: T; loading: boolean; error?: Error } {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<Error>()

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
          setData(undefined)
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
