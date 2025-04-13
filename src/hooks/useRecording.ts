import { useState, useEffect } from 'react'
import { fetchRosbags as mockFetchRosbags } from '@/api/mock/MockRosbagsAPI'
import { fetchRosbags as realFetchRosbags } from '@/api/RosbagsAPI'
import { RecordingStatus } from '@/types/Recording'

const startRecording = import.meta.env.PROD
  ? realFetchRosbags
  : mockFetchRosbags

// export const useRosbags = () => {
//     const [data, setData] = useState<RecordingStatus>();
//     const [error, setError] = useState<string>("");
//
//     useEffect(() => {
//         const getRosbags = async () => {
//             try {
//                 const result = await fetchRosbags();
//                 setData(result);
//                 setError(""); // Reset error if successful
//             } catch (error) {
//                 setError("Could not fetch rosbags");
//                 setData([]); // Reset the services on error
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         getRosbags();
//     }, []);
//
//     return { data, loading, error };
// };
//
