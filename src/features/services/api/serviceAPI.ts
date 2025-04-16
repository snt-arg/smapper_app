import client from '@/shared/api/client'
import { ServiceStatus } from '../types/Service'

async function getServices(): Promise<ServiceStatus[]> {
  const response = await client.get('/services')
  return response.data as ServiceStatus[]
}

async function getService(id: string): Promise<ServiceStatus> {
  const response = await client.get(`/services/${id}`)
  return response.data as ServiceStatus
}

async function startService(id: string): Promise<ServiceStatus> {
  const response = await client.post(`/services/${id}/start`)
  return response.data as ServiceStatus
}

async function stopService(id: string): Promise<ServiceStatus> {
  const response = await client.post(`/services/${id}/stop`)
  return response.data as ServiceStatus
}

export const ServiceAPI = {
  getServices,
  getService,
  startService,
  stopService,
}

export default {
  getServices,
  getService,
  startService,
  stopService,
}
