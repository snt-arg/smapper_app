import { Service } from "../../types/Service";

// Load Env variable (Only VITE_NAME is possible)
const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/services`;

/**
 * Fetch all services from the API.
 *
 * @returns {Promise<Service[]>} A promise that resolves to an array of services.
 */
export async function fetchServices(): Promise<Service[]> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}
