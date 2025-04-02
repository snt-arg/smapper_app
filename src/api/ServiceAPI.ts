import { ServiceSchema } from "../types/Service";
import axios from "axios";

const API_URL_BASE = `${import.meta.env.VITE_API_URL}/api/v1/services`;

/**
 * Fetch all services from the API.
 *
 * @returns {Promise<ServiceSchema[]>} A promise which returns an array of services.
 */
export async function fetchServices(): Promise<ServiceSchema[]> {
    try {
        const response = await axios.get(API_URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

/**
 * Fetch a services by it's id.
 *
 * @param id {string} Id of the service to fetch
 * @returns {Promise<ServiceSchema[]>} A promise which returns the Service metadata.
 */
export async function fetchServiceById(id: string): Promise<ServiceSchema> {
    try {
        const response = await axios.get(`${API_URL_BASE}/${id}`);
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
export async function startServiceById(id: string): Promise<ServiceSchema> {
    try {
        const response = await axios.post(`${API_URL_BASE}/${id}/start`);
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
export async function stopServiceById(id: string): Promise<ServiceSchema> {
    try {
        const response = await axios.post(`${API_URL_BASE}/${id}/stop`);
        return response.data;
    } catch (error) {
        console.error("Error stopping service:", error);
        throw error;
    }
}
