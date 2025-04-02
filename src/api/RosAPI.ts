import axios from "axios";
import { TopicSchema } from "../types/Ros";


const API_URL_BASE = `${import.meta.env.VITE_API_URL}/api/v1/ros`;

export async function fetchTopics(): Promise<TopicSchema[]> {

    const url: string = `${API_URL_BASE}/topics`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("Failed to fetch ros topics");
        throw error;
    }
}

export async function fetchTopic(name: string): Promise<TopicSchema> {

    const url: string = `${API_URL_BASE}/topics/${name}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("Failed to fetch ros topic with name ", name);
        throw error;
    }
}

export async function addTopicToMonitor(name: string): Promise<TopicSchema> {

    const url: string = `${API_URL_BASE}/topics/?topic_name=${name}`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.log("Failed to add ros topic with name ", name);
        throw error;
    }
}

export async function removeTopicToMonitor(name: string): Promise<TopicSchema> {

    const url: string = `${API_URL_BASE}/topics/?topic_name=${name}`;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.log("Failed to delete ros topic with name ", name);
        throw error;
    }
}
