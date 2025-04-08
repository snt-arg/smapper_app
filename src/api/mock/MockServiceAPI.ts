import { ServiceStatus } from "@/types/Service";

const services: ServiceStatus[] = [
    {
        id: "ouster",
        name: "Ouster OS 0",
        state: "Active",
    },
    {
        id: "argus",
        name: "Argus Cameras",
        state: "Inactive",
    },
    {
        id: "realsense",
        name: "Realsnse D435i",
        state: "Failure",
    },
    {
        id: "test",
        name: "A test service",
        state: "terminated",
    }
]

export async function mockFetchServices(): Promise<ServiceStatus[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(services)
        }, 200)
    })
}

export async function mockFetchService(id: string): Promise<ServiceStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const service = services.find(item => item.id === id);
            if (!service) {
                throw Error("Error finding service with id");
            }
            resolve(service)
        }, 200)
    })
}


export async function mockStartServiceById(id: string): Promise<ServiceStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const service = services.find(item => item.id === id);
            if (!service) {
                throw Error("Error finding service with id");
            }
            service.state = "Active"
            resolve(service)
        }, 200)
    })
}

export async function mockStopServiceById(id: string): Promise<ServiceStatus> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const service = services.find(item => item.id === id);
            if (!service) {
                throw Error("Error finding service with id");
            }
            service.state = "Inactive"
            resolve(service)
        }, 200)
    })
}
