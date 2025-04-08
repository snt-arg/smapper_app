import { ServiceStatus } from "../types/Service";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/services`;

/**
 * Fetch all services from the API.
 *
 * @returns {Promise<ServiceStatus[]>} A promise which returns an array of services.
 */
export async function fetchServices(): Promise<ServiceStatus[]> {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

/**
 * Fetch a service by it's id.
 *
 * @param id {string} Id of the service to fetch
 * @returns {Promise<ServiceStatus[]>} A promise which returns the Service metadata.
 */
export async function fetchService(id: string): Promise<ServiceStatus> {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}


/**
 * Sends a request to API to start the service by id.
 *
 * @param id {string} Id of the service to start
 * @returns {Promise<ServiceSchema[]>} A promise which returns the Service metadata of the started service.
 */
export async function startService(id: string): Promise<ServiceStatus> {
    try {
        const response = await axios.post(`${BASE_URL}/${id}/start`);
        return response.data;
    } catch (error) {
        console.error("Error starting service:", error);
        throw error;
    }
}

/**
 * Sends a request to API to stop the service by id.
 *
 * @param id {string} Id of the service to stop
 * @returns {Promise<ServiceSchema[]>} A promise which returns the Service metadata of the stopped service.
 */
export async function stopService(id: string): Promise<ServiceStatus> {
    try {
        const response = await axios.post(`${BASE_URL}/${id}/stop`);
        return response.data;
    } catch (error) {
        console.error("Error stopping service:", error);
        throw error;
    }
}
