import client from '@/shared/api/client'
import { ServiceStatus } from '../types/Service'

async function getServices(): Promise<ServiceStatus[]> {
  return client.get('/services').then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch services')
    }
  })
}

async function getService(id: string): Promise<ServiceStatus> {
  return client.get(`/services/${id}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch service')
    }
  })
}

async function startService(id: string): Promise<ServiceStatus> {
  return client.post(`/services/${id}/start`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to start service')
    }
  })
}

async function stopService(id: string): Promise<ServiceStatus> {
  return client.post(`/services/${id}/stop`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to stop service')
    }
  })
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
