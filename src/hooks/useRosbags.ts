import { useState, useEffect } from "react";
import { fetchRosbags as mockFetchRosbags } from "@/api/mock/MockRosbagsAPI";
import { fetchRosbags as realFetchRosbags } from "@/api/RosbagsAPI";
import { RosbagMetadata } from "@/types/ros/Rosbag";


const fetchRosbags = import.meta.env.PROD ? realFetchRosbags : mockFetchRosbags

export const useRosbags = () => {
    const [data, setData] = useState<RosbagMetadata[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getRosbags = async () => {
            try {
                const result = await fetchRosbags();
                setData(result);
                setError(""); // Reset error if successful
            } catch (error) {
                setError("Could not fetch rosbags");
                setData([]); // Reset the services on error
            } finally {
                setLoading(false);
            }
        };

        getRosbags();
    }, []);

    return { data, loading, error };
};

