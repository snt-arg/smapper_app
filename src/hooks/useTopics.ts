import { useState, useEffect } from "react";
import { fetchTopics as mockFetchTopics } from "@/api/mock/MockRosAPI";
import { fetchTopics as realFetchTopics } from "@/api/RosAPI";
import { TopicSchema } from "@/types/Ros";


const fetchTopics = import.meta.env.PROD ? realFetchTopics : mockFetchTopics

export const useTopics = () => {
    const [topics, setTopics] = useState<TopicSchema[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getTopics = async () => {
            try {
                const data = await fetchTopics();
                setTopics(data);
                setError(""); // Reset error if successful
            } catch (error) {
                setError("Could not fetch services");
                setTopics([]); // Reset the services on error
            } finally {
            }
        };

        getTopics();

        const interval = setInterval(() => {
            getTopics();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return { topics: topics, error };
};
