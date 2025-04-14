import { ServiceStatus } from '@/features/services/types/Service'

function getServices(): Promise<ServiceStatus[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services)
    }, 200)
  })
}

export async function getService(id: string): Promise<ServiceStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find((item) => item.id === id)
      if (!service) {
        throw Error('Error finding service with id')
      }
      resolve(service)
    }, 200)
  })
}

export async function startService(id: string): Promise<ServiceStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find((item) => item.id === id)
      if (!service) {
        throw Error('Error finding service with id')
      }
      service.state = 'Active'
      resolve(service)
    }, 200)
  })
}

export async function stopService(id: string): Promise<ServiceStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find((item) => item.id === id)
      if (!service) {
        throw Error('Error finding service with id')
      }
      service.state = 'Inactive'
      resolve(service)
    }, 200)
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

const services: ServiceStatus[] = [
  {
    id: 'ouster',
    name: 'Ouster OS 0',
    state: 'Active',
  },
  {
    id: 'argus',
    name: 'Argus Cameras',
    state: 'Inactive',
  },
  {
    id: 'realsense',
    name: 'Realsnse D435i',
    state: 'Failure',
  },
  {
    id: 'test',
    name: 'A test service',
    state: 'terminated',
  },
]
