import axios from "axios";
import { BagSchema, RecordingSchema, RecordingStatus } from "../types/Bag";


const API_URL_BASE = `${import.meta.env.VITE_API_URL}/api/v1/bags`;

export async function fetchBags(): Promise<BagSchema[]> {
    try {
        const response = await axios.get(API_URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

export async function fetchBagById(id: string): Promise<BagSchema> {
    const url = `${API_URL_BASE}/${id}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}


export async function startBagRecording(metadata: RecordingSchema): Promise<RecordingStatus> {
    const url = `${API_URL_BASE}/record/start`
    try {
        const response = await axios.post(url, metadata);
        return response.data;
    } catch (error) {
        console.error("Error starting service:", error);
        throw error;
    }
}

export async function stopBagRecording(): Promise<BagSchema> {
    const url = `${API_URL_BASE}/record/start`
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Error starting service:", error);
        throw error;
    }
}

export async function fetchRecordingStatus(): Promise<RecordingStatus> {
    const url = `${API_URL_BASE}/record/state`
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Error starting service:", error);
        throw error;
    }
}
