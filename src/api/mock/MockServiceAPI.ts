import { ServiceSchema } from "@/types/Service";

const services: ServiceSchema[] = [
    {
        id: "ouster",
        name: "Ouster OS 0",
        status: "Active",
    },
    {
        id: "argus",
        name: "Argus Cameras",
        status: "Inactive",
    },
    {
        id: "realsense",
        name: "Realsnse D435i",
        status: "Failure",
    },
    {
        id: "test",
        name: "A test service",
        status: "terminated",
    }
]

export async function mockFetchServices(): Promise<ServiceSchema[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(services)
        }, 200)
    })
}

export async function mockFetchServiceById(id: string): Promise<ServiceSchema> {
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


export async function mockStartServiceById(id: string): Promise<ServiceSchema> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const service = services.find(item => item.id === id);
            if (!service) {
                throw Error("Error finding service with id");
            }
            service.status = "Active"
            resolve(service)
        }, 200)
    })
}

export async function mockStopServiceById(id: string): Promise<ServiceSchema> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const service = services.find(item => item.id === id);
            if (!service) {
                throw Error("Error finding service with id");
            }
            service.status = "Inactive"
            resolve(service)
        }, 200)
    })
}
